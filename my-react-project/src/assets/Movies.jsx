import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const userId = 1;

  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/movie")
      .then((res) => {
        setMovies(res.data); 
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addToWishlist = (movieId) => {
    axios
      .post("http://localhost:5000/wishlist", {
        user_id: userId,
        movie_id: movieId,
      })
      .then((res) => {
        if (res.data.status === "success") {
          alert("Added to wishlist");
        } else if (res.data.status === "exists") {
          alert("Already in wishlist");
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <div className="toprated-header">
        <h2 className="toprated-title">All Movies</h2>
      </div>

      <section className="movies-grid">
        {movies.map((m) => (
          <div
            className="movie-card"
            key={m.movie_id}
            onClick={() => navigate(`/MovieDetails/${m.movie_id}`)}
          >
            <div className="poster-wrap">
              <img
                src={`http://localhost:5000/uploads/movie/${m.poster}`}
                alt={m.title}
                className="poster"
              />

              <div className="rating">{m.rating} ★</div>

              <button
                className="wishlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist(m.movie_id);
                }}
              >
                + Wishlist
              </button>
            </div>

            <div className="card-content">
              <h3 className="movie-title">
                {m.title} <span className="year">({m.release_year})</span>
              </h3>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
