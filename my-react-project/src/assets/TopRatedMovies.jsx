import React, { useEffect, useState, useRef } from "react";
import "./TopRatedMovies.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const userId = 1;

  const fetchTopRated = () => {
    axios
      .get("http://localhost:5000/movie")
      .then((res) => {
        const sorted = res.data
          .filter((m) => m.rating)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);

        setMovies(sorted);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += 300;
  };

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
        <h2 className="toprated-title">Top Rated Movies</h2>

        <div className="slider-btns">
          <button onClick={scrollLeft}>❮</button>
          <button onClick={scrollRight}>❯</button>
        </div>
      </div>

      <section className="toprated-section" ref={sliderRef}>
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
