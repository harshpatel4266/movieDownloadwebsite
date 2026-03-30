import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TopRatedMovies.css";

export default function GenreMovies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/moviebygenre/${id}`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch(console.log);
  }, [id]);

  return (
    <>
      <div className="top">
        <section className="toprated-section">
          {movies.length === 0 ? (
            <p style={{ color: "#999" }}>No movies found</p>
          ) : (
            movies.map((m) => (
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
                </div>

                <div className="card-content">
                  <h3 className="movie-title">
                    {m.title}
                    <span className="year"> ({m.release_year})</span>
                  </h3>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
}
