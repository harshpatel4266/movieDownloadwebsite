import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { ImOpera } from "react-icons/im";

export function NavScrollExample() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query.trim() === "") return;

    axios
      .get(`http://localhost:5000/search?q=${query}`)
      .then((res) => setMovies(res.data))
      .catch(console.log);
  }, [query]);
  const handleProfileClick = () => {
    const isLogin = localStorage.getItem("islogin");

    if (!isLogin) {
      navigate("/login");
    } else {
      setShow(!show);
    }
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand className="brand">MovieFlix</Navbar.Brand>

          <Nav className="menu">
            <NavLink to="/" className="navlink">
              Home
            </NavLink>
            <NavLink to="/wishlist" className="navlink">
              Wishlist
            </NavLink>
            <NavLink to="/movies" className="navlink">
              Movies
            </NavLink>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {movies.length > 0 && (
                <div className="search-dropdown">
                  {movies.map((m) => (
                    <div
                      key={m.movie_id}
                      className="search-item"
                      onClick={() => navigate(`/MovieDetails/${m.movie_id}`)}
                    >
                      <img
                        src={`http://localhost:5000/uploads/movie/${m.poster}`}
                        alt={m.title}
                      />
                      <div>
                        <h4>{m.title}</h4>
                        <p>
                          {m.release_year} • {m.language}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-wrapper">
              <img
                src="/Logo/logo.png"
                alt="profile"
                className="profile-img"
                onClick={handleProfileClick}
              />

              {show && (
                <div className="profile-popup">
                  <div
                    className="popup-item"
                    onClick={() => navigate("/Login")}
                  >
                    Login
                  </div>
                  <div
                    className="popup-item"
                    onClick={() => navigate("/Register")}
                  >
                    Register
                  </div>
                </div>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
