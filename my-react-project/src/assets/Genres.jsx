import "./Genre.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Genres() {
  const sliderRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const scrollLeft = () => {
    if (!cardRef.current) return;
    sliderRef.current.scrollLeft -= cardRef.current.offsetWidth + 20;
  };

  const scrollRight = () => {
    if (!cardRef.current) return;
    sliderRef.current.scrollLeft += cardRef.current.offsetWidth + 20;
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="genre">
      <h2>Genere</h2>
      <div className="genre-wrapper">
        {/* Left Button */}
        <button className="nav-btn left" onClick={scrollLeft}>
          ❮
        </button>

        {/* SLIDER */}
        <div className="genre-section" ref={sliderRef}>
          {/* API Categories */}
          {data.map((cat, index) => (
            <div
              key={cat.cat_id}
              ref={index === 0 ? cardRef : null}
              className="genre-image-card group"
              onClick={() => navigate(`/genre/${cat.cat_id}`)}

            >
              <img
                src={`http://localhost:5000/uploads/category/${cat.cat_img}`}
                alt={cat.cat_name}
              />

              <div className="overlay">
                <span>{cat.cat_name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button className="nav-btn right" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </div>
  );
}
