import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

export default function Wishlist() {
  const userId = 1;
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = () => {
    axios
      .get(`http://localhost:5000/wishlist/${userId}`)
      .then((res) => {
        if (res.data.status === "success") {
          setMovies(res.data.data);
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeMovie = (movie_id) => {
    axios
      .delete(`http://localhost:5000/wishlist/${userId}/${movie_id}`)
      .then(() => fetchWishlist())
      .catch(console.log);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        <p>Movies you want to watch later</p>
      </div>

      <div className="wishlist-grid">
        {movies.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.7 }}>Wishlist is empty</p>
        ) : (
          movies.map((movie) => (
            <div
              className="wishlist-card"
              key={movie.movie_id}
              onClick={() => navigate(`/MovieDetails/${movie.movie_id}`)}
            >
              <img
                src={`http://localhost:5000/uploads/movie/${movie.poster}`}
                alt={movie.title}
              />

              <div className="wishlist-overlay">
                <h4>{movie.title}</h4>
                <span>⭐ {movie.rating}</span>

                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMovie(movie.movie_id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
