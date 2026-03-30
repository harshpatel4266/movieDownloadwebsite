import "./Background.css";
import { useNavigate } from "react-router-dom";
export default function Background() {


  const navigate = useNavigate();
  return (
    <div className="movie-details-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back home
      </button>

      <div className="movie-details-container">

        {/* LEFT SECTION — POSTER */}
        <div className="poster-box">
          <img className="rrr" src="/Movies/RRR.jpg" alt="RRR" />
        </div>

        {/* RIGHT SECTION */}
        <div className="movie-info">

          <div className="title-row">
            <h1>RRR</h1>
   
          </div>

          <p className="meta"><strong>Genre:</strong> Action/Adventure</p>
          <p className="meta"><strong>Time:</strong> 3h 2m</p>
          <p className="meta">
            <strong>Stars:</strong> Ram Charan,Jr N.T.R, Ajay Devgn,Alia Bhatt
          </p>
          <p className="meta"><strong>Created by:</strong> S.S. Rajamouli</p>
          <p className="meta"><strong>Network:</strong> Netflix</p>
          <p className="meta"><strong>Language:</strong> Hindi,Tamil ,Telugu</p>
          <p className="meta"><strong>Quality:</strong>1080p</p>
          <p className="meta"><strong>Release year:</strong> 2023</p>

         
          <div className="rating-box">7.8</div>

          {/* Description */}
          <p className="description">
          RRR (Rise, Roar, Revolt) tells a fictional story of two legendary Indian revolutionaries, Alluri Sitarama Raju  and Komaram Bheem , set in 1920s British India, who form an unlikely bond while unknowingly working against each other before uniting to fight the oppressive colonial rule and rescue a young girl. 
          </p>

          {/* BUTTONS */}
          <div className="action-btns">
            <button className="watch-btn"> Watch Now</button>
            <button className="watchlist-btn">+ Watchlist</button>
          </div>
        </div>

        {/* COMMENTS COUNTER (TOP RIGHT) */}
        <div className="top-right-info">
           <p>28 Comments</p>
        
        </div>

      </div>
    </div>
  );
}
