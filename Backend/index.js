const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File upload (FormData)
const upload = multer();

//category
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/category");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//movie
const movieStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/movie");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//scrennshots

const screenshotsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/screenshots");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadCategory = multer({ storage: categoryStorage });
const uploadmovie = multer({ storage: movieStorage });
const uploadscreenshots = multer({ storage: screenshotsStorage });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_db",
});

//database connection
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed!", err);
  } else {
    console.log("MySQL Connected Successfully!");
  }
});

// Count total user
app.get("/user/count", (req, res) => {
  const sql = "SELECT COUNT(*) AS total FROM tbl_user";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      total: result[0].total,
    });
  });
});

// user register

app.post("/user/signup", upload.none(), (req, res) => {
  const { username, email, phone, password } = req.body;
  const sql =
    "INSERT INTO tbl_user (username, email,phone, password ) VALUES (?, ?,?,?)";

  db.query(sql, [username, email, phone, password], (err, result) => {
    // if (err) return res.json("Error");

    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Registerd successfully!",
      id: result.insertId,
    });
  });
});

//get user
app.get("/user", (req, res) => {
  db.query("SELECT * FROM tbl_user ", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
  //   res.send("welcome");
});

//delete users
app.delete("/user/:id", (req, res) => {
  const id = req.params.id;

  const sql = "delete from tbl_user where user_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "User Delete successfully!",
      id: result.insertId,
    });
  });
});

//login both admin or user
// app.post("/login", upload.none(), (req, res) => {
//   const { email, password } = req.body;

//   const adminSql = "SELECT * FROM tbl_admin WHERE email=? AND password=?";

//   db.query(adminSql, [email, password], (err, adminResult) => {
//     if (err) return res.json({ status: "error", message: "Server error" });

//     if (adminResult.length > 0) {
//       return res.json({
//         status: "success",
//         role: "admin",
//         message: "Admin login successfully!",
//         data: adminResult[0],
//       });
//     }

//     const userSql = "SELECT * FROM tbl_user WHERE email=? AND password=?";

//     db.query(userSql, [email, password], (err, userResult) => {
//       if (err) return res.json({ status: "error", message: "Server error" });

//       if (userResult.length > 0) {
//         return res.json({
//           status: "success",
//           role: "user",
//           message: "User login successfully!",
//           data: userResult[0],
//         });
//       }

//       return res.json({
//         status: "error",
//         message: "Invalid email or password",
//       });
//     });
//   });
// });

//user login
app.post("/user/login", upload.none(), (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM  tbl_user WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json("Error");

    if (result.length > 0) {
      return res.json({
        status: "success",
        message: "Login successfully!",
      });
    } else {
      return res.json("invalid email and password");
    }
  });
});

// admin login

app.post("/admin/login", upload.none(), (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM  tbl_admin WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json("Error");

    if (result.length > 0) {
      return res.json({
        status: "success",
        message: "Login successfully!",
      });
    } else {
      return res.json("invalid email and password");
    }
  });
});

// app.use("/uploads", express.static("uploads"));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
// READ all products
app.get("/users", (req, res) => {
  db.query("SELECT * FROM tbl_user", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
  //   res.send("welcome");
});

// Example POST API for add category (FormData support)
app.post("/category", uploadCategory.single("catimg"), (req, res) => {
  const { catname } = req.body;
  const catimg = req.file.filename;

  const sql = "INSERT INTO tbl_category (cat_name, cat_img) VALUES (?, ?)";
  db.query(sql, [catname, catimg], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Category added successfully!",
      id: result.insertId,
    });
  });
});

// get api for category
app.get("/category", (req, res) => {
  db.query("SELECT * FROM tbl_category ", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
  //   res.send("welcome");
});

// update category

app.put("/category/:id", uploadCategory.single("catimg"), (req, res) => {
  const { catname } = req.body;
  const id = req.params.id;

  // 🔹 Step 1: Get old images from DB
  const getOldSql = "SELECT cat_img FROM tbl_category WHERE cat_id=?";
  db.query(getOldSql, [id], (err, rows) => {
    if (err) {
      return res.json({ status: "error", error: err });
    }

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Category not found" });
    }

    // 🔹 Old images
    let catimg = rows[0].cat_img;

    // 🔹 Step 2: Replace ONLY if new image uploaded
    // if (req.files && req.files.cat_img) {
    //   catimg = req.files.cat_img[0].filename;
    // }

    if (req.file) {
      catimg = req.file.filename;
    }

    // 🔹 Step 3: Update DB
    const updateSql =
      "UPDATE tbl_category SET cat_name=?, cat_img=? WHERE cat_id=?";

    db.query(updateSql, [catname, catimg, id], (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }

      res.json({
        status: "success",
        message: "Category Updated Successfully!",
      });
    });
  });
});

//Genre Mapping

app.post("/genre", upload.none(), (req, res) => {
  const { movie_id, cat_ids } = req.body;

  // cat_ids FormData me string aayega → "1,2,3"
  if (!movie_id || !cat_ids) {
    return res.status(400).json({
      status: "error",
      message: "movie_id and cat_ids are required",
    });
  }

  // Convert "1,2,3" → [1,2,3]
  const categoryArray = cat_ids.split(",").map(Number);

  // STEP 1: Delete old genres
  db.query("DELETE FROM tbl_genre WHERE movie_id = ?", [movie_id], (err) => {
    if (err) return res.status(500).json({ error: err });

    // STEP 2: Insert new genres
    const values = categoryArray.map((cat_id) => [movie_id, cat_id]);

    const sql = "INSERT INTO tbl_genre (movie_id, cat_id) VALUES ?";

    db.query(sql, [values], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2 });

      res.json({
        status: "success",
        message: "Genres mapped successfully",
        inserted: result.affectedRows,
      });
    });
  });
});

// get genre
app.get("/genre", (req, res) => {
  const sql = `
    SELECT 
      m.movie_id,
      m.title,
      m.description,
      m.poster,
      GROUP_CONCAT(c.cat_name ORDER BY c.cat_name SEPARATOR ', ') AS genres
    FROM tbl_movie m
    JOIN tbl_genre g ON g.movie_id = m.movie_id
    JOIN tbl_category c ON c.cat_id = g.cat_id
    GROUP BY 
      m.movie_id, m.title, m.description, m.poster
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// get genre by id
app.get("/genre/:movie_id", (req, res) => {
  const movie_id = req.params.movie_id;

  const sql = `
    SELECT cat_id
    FROM tbl_genre
    WHERE movie_id = ?
  `;

  db.query(sql, [movie_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// delete genre

app.delete("/genre/:movie_id", (req, res) => {
  const { movie_id } = req.params;

  if (!movie_id) {
    return res.status(400).json({
      status: "error",
      message: "movie_id required",
    });
  }

  db.query(
    "DELETE FROM tbl_genre WHERE movie_id = ?",
    [movie_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        status: "success",
        deleted: result.affectedRows,
      });
    }
  );
});

// Example GET API for  movie (FormData support)
app.get("/movie", (req, res) => {
  db.query("SELECT * FROM tbl_movie", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
  //   res.send("welcome");
});

// Count total movies
app.get("/movie/count", (req, res) => {
  const sql = "SELECT COUNT(*) AS total FROM tbl_movie";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      total: result[0].total,
    });
  });
});

// Example POST API for add movie (FormData support)
app.post("/movie", uploadmovie.single("movie_poster"), (req, res) => {
  const {
    title,
    stars,
    created_by,
    duration,
    description,
    release_year,
    language,
    rating,
    quality,
  } = req.body;

  const movie_poster = req.file.filename;

  let qualityStr = "";
  if (quality) {
    const qualityArr = JSON.parse(quality); // ["1080p","720p"]
    qualityStr = qualityArr.join(","); // "1080p,720p"
  }

  const sql =
    "INSERT INTO tbl_movie (title,stars,created_by,duration,description,release_year,language,rating,quality,poster) VALUES (?, ?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      title,
      stars,
      created_by,
      duration,
      description,
      release_year,
      language,
      rating,
      qualityStr,
      movie_poster,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({
        status: "success",
        message: "Movie added successfully!",
        id: result.insertId,
      });
    }
  );
});

//update movie

app.put("/movie/:id", uploadmovie.single("movie_poster"), (req, res) => {
  const {
    title,
    description,
    stars,
    created_by,
    duration,
    release_year,
    language,
    rating,
    quality,
  } = req.body;
  const id = req.params.id;

  // 🔹 Step 1: Get old images from DB
  const getOldSql = "SELECT poster FROM tbl_movie WHERE movie_id=?";
  db.query(getOldSql, [id], (err, rows) => {
    if (err) {
      return res.json({ status: "error", error: err });
    }

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Movie not found" });
    }

    // 🔹 Old images
    let MoviePoster = rows[0].poster;

    // 🔹 Step 2: Replace ONLY if new image uploaded
    if (req.file) {
      MoviePoster = req.file.filename;
    }
    //quality update
    let qualityStr = "";
    if (quality) {
      const qualityArr = JSON.parse(quality);
      qualityStr = qualityArr.join(",");
    }

    // 🔹 Step 3: Update DB
    const updateSql =
      "UPDATE tbl_movie SET title=?,stars=?,created_by=?,duration=?,description=?,release_year=?,language=?,rating=?,quality=?,poster=? WHERE movie_id=?";

    db.query(
      updateSql,
      [
        title,
        stars,
        created_by,
        duration,
        description,
        release_year,
        language,
        rating,
        qualityStr,
        MoviePoster,
        id,
      ],
      (err, result) => {
        if (err) {
          return res.json({ status: "error", error: err });
        }

        res.json({
          status: "success",
          message: "Movie Updated Successfully!",
        });
      }
    );
  });
});

//movie details
app.get("/movie-details/:id", (req, res) => {
  const { id } = req.params;

  const movieSql = `
    SELECT 
      m.movie_id,
      m.title,
      m.stars,
      m.created_by,
      m.duration,
      m.quality,
      m.description,
      m.poster,
      m.release_year,
      m.language,
      m.rating,
      GROUP_CONCAT(c.cat_name SEPARATOR ', ') AS genres
    FROM tbl_movie m
    JOIN tbl_genre g ON g.movie_id = m.movie_id
    JOIN tbl_category c ON c.cat_id = g.cat_id
    WHERE m.movie_id = ?
    GROUP BY m.movie_id
  `;

  const downloadSql = `
    SELECT quality, size, file_url
    FROM tbl_download
    WHERE movie_id = ?
  `;

  const screenshotSql = `
    SELECT image
    FROM tbl_screenshots
    WHERE movie_id = ?
  `;

  db.query(movieSql, [id], (err, movieResult) => {
    if (err) return res.status(500).json(err);
    if (movieResult.length === 0)
      return res.status(404).json({ message: "Movie not found" });

    db.query(downloadSql, [id], (err, downloadResult) => {
      if (err) return res.status(500).json(err);

      db.query(screenshotSql, [id], (err, screenshotResult) => {
        if (err) return res.status(500).json(err);

        res.json({
          ...movieResult[0],
          downloads: downloadResult,
          screenshots: screenshotResult, // ✅ added
        });
      });
    });
  });
});

// Example GET API for download  movie (FormData support)
app.get("/download", (req, res) => {
  db.query("SELECT * FROM tbl_download ", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
  //   res.send("welcome");
});

//get dwonload link by ids
// app.get("/download/:id", (req, res) => {
//   const id = req.params.id;
//   const sql =
//     "SELECT * FROM tbl_download as d left join tbl_movie as m on d.movie_id=m.movie_id";
//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ error: err });
//     res.json(result);
//   });
//   //   res.send("welcome");
// });

// Example POST API for add movie (FormData support)
app.post("/download", upload.none(), (req, res) => {
  const { movie_id, quality, size, file_url } = req.body;

  const sql =
    "INSERT INTO tbl_download (movie_id,quality,size,file_url) VALUES (?, ?,?,?)";
  db.query(sql, [movie_id, quality, size, file_url], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Download  successfully!",
      id: result.insertId,
    });
  });
});

//update download Link

app.put("/download/:id", upload.none(), (req, res) => {
  const { movie_id, quality, size, file_url } = req.body;
  const id = req.params.id;
  const updateSql =
    "UPDATE tbl_download SET movie_id= ?,quality=?,size=?,file_url=? WHERE download_id=?";
  db.query(
    updateSql,
    [movie_id, quality, size, file_url, id],
    (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }
      res.json({
        status: "success",
        message: "Download Link Updated Successfully!",
      });
    }
  );
});

// Delete Download Link

app.delete("/deletedownload/:id", (req, res) => {
  const id = req.params.id;

  const sql = "delete from tbl_download where download_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Download Link Delete successfully!",
      id: result.insertId,
    });
  });
});

// Example GET API for Screenshots  movie (FormData support)
app.get("/screenshots", (req, res) => {
  db.query("SELECT * FROM tbl_screenshots", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
  //   res.send("welcome");
});

// Example POST API for add Screenshots (FormData support)
app.post("/screenshots", uploadscreenshots.single("image"), (req, res) => {
  const { movie_id } = req.body;
  const image = req.file.filename;

  const sql = "INSERT INTO tbl_screenshots (movie_id,image) VALUES (?, ?)";
  db.query(sql, [movie_id, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Screenshot added successfully!",
      id: result.insertId,
    });
  });
});

// update scrennshot

app.put("/screenshots/:id", uploadscreenshots.single("image"), (req, res) => {
  const { movie_id } = req.body;
  const id = req.params.id;

  // 🔹 Step 1: Get old images from DB
  const getOldSql = "SELECT image FROM tbl_screenshots WHERE ss_id=?";
  db.query(getOldSql, [id], (err, rows) => {
    if (err) {
      return res.json({ status: "error", error: err });
    }

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Screenshot not found" });
    }

    // 🔹 Old images
    let ssimg = rows[0].image;

    // 🔹 Step 2: Replace ONLY if new image uploaded
    if (req.file) {
      ssimg = req.file.filename;
    }

    // 🔹 Step 3: Update DB
    const updateSql =
      "UPDATE tbl_screenshots SET movie_id=?, image=? WHERE ss_id=?";

    db.query(updateSql, [movie_id, ssimg, id], (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }

      res.json({
        status: "success",
        message: "Screenshot Updated Successfully!",
      });
    });
  });
});

//screenshots delete
app.delete("/deletescreenshots/:id", (req, res) => {
  const id = req.params.id;

  const sql = "delete from tbl_screenshots where ss_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Screenshot Delete successfully!",
      id: result.insertId,
    });
  });
});

//movie delete
app.delete("/movie/:id", (req, res) => {
  const id = req.params.id;

  const sql = "delete from tbl_movie where movie_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Movie Delete successfully!",
      id: result.insertId,
    });
  });
});

//category delete
app.delete("/category/:id", (req, res) => {
  const id = req.params.id;

  const sql = "delete from tbl_category where cat_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "category Delete successfully!",
      id: result.insertId,
    });
  });
});

//get category by id

app.get("/getsinglecategory/:id", (req, res) => {
  const id = req.params.id;

  const sql = "select * from tbl_category where cat_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "category get successfully!",
      data: result[0],
    });
  });
  //   res.send("welcome");
});

//get movie by id

app.get("/getmovie/:id", (req, res) => {
  const id = req.params.id;

  const sql = "select * from tbl_movie where movie_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "category get successfully!",
      data: result[0],
    });
  });
  //   res.send("welcome");
});

//get screenshots by id

app.get("/getscreenshot/:id", (req, res) => {
  const id = req.params.id;

  const sql = "select * from tbl_screenshots where ss_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "category get successfully!",
      data: result[0],
    });
  });
  //   res.send("welcome");
});

// get download link by id
app.get("/getdownload/:id", (req, res) => {
  const id = req.params.id;

  const sql = "select * from tbl_download where download_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      status: "success",
      message: "Download Link get successfully!",
      data: result[0],
    });
  });
  //   res.send("welcome");
});

//movie by genre
app.get("/moviebygenre/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT m.*
    FROM tbl_movie m
    INNER JOIN tbl_genre mg 
      ON m.movie_id = mg.movie_id
    WHERE mg.cat_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

//comment
app.post("/comments", upload.none(), (req, res) => {
  const { movie_id, user_id, comment_text } = req.body;

  // if (!movie_id || !user_id || !comment_text) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: "movie_id, user_id and comment_text required",
  //   });
  // }

  const sql = `
    INSERT INTO tbl_comments (movie_id, user_id, comment_text )
    VALUES (?, ?, ?)
  `;

  db.query(sql, [movie_id, user_id, comment_text], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      status: "success",
      message: "Comment added successfully",
      comment_id: result.insertId,
    });
  });
});

app.get("/comments/:movie_id", (req, res) => {
  const { movie_id } = req.params;

  const sql = `
    SELECT 
      c.comments_id,
      c.comment_text,
      c.created_at,
      u.user_id,
      u.username
    FROM tbl_comments c
    JOIN tbl_user u ON u.user_id = c.user_id
    WHERE c.movie_id = ?
    ORDER BY c.created_at DESC
  `;

  db.query(sql, [movie_id], (err, result) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ status: "error" });
    }

    res.json({
      status: "success",
      data: result,
    });
  });
});

//whishlist
app.post("/wishlist", upload.none(), (req, res) => {
  const { user_id, movie_id } = req.body;

  const checkSql = "SELECT * FROM tbl_wishlist WHERE user_id=? AND movie_id=?";

  db.query(checkSql, [user_id, movie_id], (err, rows) => {
    if (rows.length > 0) {
      return res.json({
        status: "exists",
        message: "Movie already in wishlist",
      });
    }

    const sql = "INSERT INTO tbl_wishlist (user_id, movie_id) VALUES (?, ?)";

    db.query(sql, [user_id, movie_id], (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        status: "success",
        message: "Added to wishlist",
      });
    });
  });
});

//get whishlist movie
app.get("/wishlist/:user_id", upload.none(), (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT 
      w.wishlist_id,
      m.movie_id,
      m.title,
      m.rating,
      m.poster
    FROM tbl_wishlist w
    JOIN tbl_movie m ON m.movie_id = w.movie_id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      status: "success",
      data: result,
    });
  });
});

//delete whislist movie
app.delete("/wishlist/:user_id/:movie_id", upload.none(), (req, res) => {
  const { user_id, movie_id } = req.params;

  const sql = "DELETE FROM tbl_wishlist WHERE user_id=? AND movie_id=?";

  db.query(sql, [user_id, movie_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      status: "success",
      message: "Removed from wishlist",
    });
  });
});

//search
app.get("/search", (req, res) => {
  const search = req.query.q;

  const sql = `
    SELECT * FROM tbl_movie 
    WHERE title LIKE ? 
       OR language LIKE ?
       OR release_year LIKE ?
  `;

  const value = `%${search}%`;

  db.query(sql, [value, value, value], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


//server port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
