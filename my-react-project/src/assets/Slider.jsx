import Carousel from "react-bootstrap/Carousel";
import "./Slider.css";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const navigate = useNavigate();

  return (
    <>
      <Carousel interval={3000} pause={false} indicators={false}>
        {/* SLIDE 1 */}
        <Carousel.Item
          className="slider-item"
          onClick={() => navigate("/MovieDetails/1")}
        >
          <img
            className="d-block w-100"
            src="/Movies/Titanic2.jpg"
            alt="Titanic"
          />

          <div className="center-btn">
            <button
              className="watch-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/MovieDetails/1");
              }}
            >
              Watch Trailer
            </button>

            <button
              className="watchlist-btn"
              onClick={(e) => e.stopPropagation()}
            >
              + Wishlist
            </button>
          </div>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item
          className="slider-item"
          onClick={() => navigate("/MovieDetails/2")}
        >
          <img className="d-block w-100" src="/Movies/joker.jpg" alt="Joker" />

          <div className="center-btn">
            <button
              className="watch-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/MovieDetails/2");
              }}
            >
              Watch Now
            </button>

            <button
              className="watchlist-btn"
              onClick={(e) => e.stopPropagation()}
            >
              + Wishlist
            </button>
          </div>
        </Carousel.Item>

        {/* SLIDE 3 */}
        <Carousel.Item
          className="slider-item"
          onClick={() => navigate("/MovieDetails/3")}
        >
          <img className="d-block w-100" src="/Movies/venom.jpg" alt="Venom" />

          <div className="center-btn">
            <button
              className="watch-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/MovieDetails/3");
              }}
            >
              Watch Trailer
            </button>

            <button
              className="watchlist-btn"
              onClick={(e) => e.stopPropagation()}
            >
              + Wishlist
            </button>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
