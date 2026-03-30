import React from "react";
import "./TopRatedMovies.css";

const movies = [
  { title: "Animal", year: 2023, rating: 9.3, poster: "/Movies/Animal.jpg" },
  { title: "Pushpa 2: The Rule", year: 2024, rating: 9.2, poster: "/Movies/Pushpa 2.jpg" },
  { title: "Ghost_Rider", year: 2007, rating: 9.1, poster: "/Movies/Ghost_Rider.jpg" },
  { title: "Vash Level2", year: 2024, rating: 8.6, poster: "/Movies/Vash Level2.jpeg" },
  { title: "Thamma", year: 2025, rating: 8.4, poster: "/Movies/Thamma.webp" },
];

export default function RelatedMovies() {
  return (
    <>
      <h2 className="toprated-title"><span>★</span> Related Movies</h2>

      <section className="toprated-section">
        {movies.map((m, i) => (
          <div className="movie-card" key={i}>
            <div className="poster-wrap">
              <img src={m.poster} alt={`${m.title} poster`} className="poster" />
              <div className="rating">{m.rating} ★</div>
            </div>
            <div className="card-content">
              <h3 className="movie-title">{m.title} <span className="year">({m.year})</span></h3>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
