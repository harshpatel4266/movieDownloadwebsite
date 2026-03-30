import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/movie-details/${id}`)
      .then((res) => setMovie(res.data))
      .catch(console.log);
  }, [id]);

  if (!movie) {
    return <p className="loading">Loading movie...</p>;
  }

  const handleDownload = (fileUrl) => {
    const isLogin = localStorage.getItem("islogin");

    if (!isLogin) {
      alert("Please login to download this movie");

      // save current page so user comes back after login
      localStorage.setItem("redirectAfterLogin", window.location.pathname);

      navigate("/login");
      return;
    }

    window.open(fileUrl, "_blank");
  };
  return (
    <div className="movie-wrapper">
      {" "}
      <div className="movie-layout">
        {" "}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="poster-box">
          <div className="poster-inner">
            {" "}
            <img
              src={`http://localhost:5000/uploads/movie/${movie.poster}`}
              alt={movie.title}
              className="poster-img"
            />
          </div>
        </div>
        {/* RIGHT : DETAILS */}
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="meta">
            {" "}
            <p className="movieinfo">
              <strong>Description:</strong> {movie.description}
            </p>
            <p>
              <strong className="movieinfo">Release Year:</strong>{" "}
              {movie.release_year}
            </p>
            <p>
              <strong className="movieinfo">Language:</strong> {movie.language}
            </p>
            <p>
              <strong className="movieinfo">IMDB Rating:</strong> {movie.rating}
            </p>
            <p>
              <strong className="movieinfo">Genres:</strong> {movie.genres}
            </p>
            <p>
              <strong className="movieinfo">Stars:</strong> {movie.stars}
            </p>
            <p>
              <strong className="movieinfo">Created By:</strong>{" "}
              {movie.created_by}
            </p>
            <p>
              <strong className="movieinfo">Duration:</strong> {movie.duration}
            </p>
            <p>
              <strong className="movieinfo">Quality:</strong> {movie.quality}
            </p>
          </div>

          {/* DOWNLOADS */}
          <h2 className="section-title">Download Options</h2>

          <div className="downloads">
            {movie.downloads?.length > 0 ? (
              movie.downloads.map((d, i) => (
                // <a
                //   key={i}
                //   href={d.file_url}
                //   target="_blank"
                //   rel="noopener noreferrer"
                //   className="download-btn"
                // >
                //   {d.quality} ({d.size})
                // </a>
                <button
                  key={i}
                  className="download-btn"
                  onClick={() => handleDownload(d.file_url)}
                >
                  {d.quality} ({d.size})
                </button>
              ))
            ) : (
              <span className="error-text">No downloads available</span>
            )}
          </div>

          {/* SCREENSHOTS */}
          <h2 className="section-title">Screenshots</h2>

          {movie.screenshots?.length > 0 ? (
            <div className="screenshots">
              {movie.screenshots.map((ss, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/uploads/screenshots/${ss.image}`}
                  alt={`screenshot-${i}`}
                />
              ))}
            </div>
          ) : (
            <p className="error-text">No screenshots available</p>
          )}
        </div>
      </div>
    </div>
  );
}
