import "./Moviefooter.css";
import { NavLink } from "react-router-dom";
export default function MovieFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Logo */}
        <div className="footer-section brand">
          <h2 className="logo">Movie<span>Flix</span></h2>
          <p>Your ultimate destination for movies.</p>
        </div>

        {/* Links */}
       <div className="nav-links">
  <NavLink to="/" end>Home</NavLink>
  <NavLink to="/wishlist">Wishlist</NavLink>
  <NavLink to="/ContactUs">Contact</NavLink>
</div>


        {/* Follow Us No Logos */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <p className="coming-soon">Social links coming soon...</p>
        </div>

      </div>

      <p className="footer-bottom">© 2025 MovieFlix. All Rights Reserved.</p>
    </footer>
  );
}
