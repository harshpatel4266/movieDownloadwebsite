import React from "react";
import "./AccountProfile.css";
import bgImage from "/public/image/background.jpg"; // movie posters background
import avatar from "/public/Logo/mb.jpg"; // profile image

export default function AccountProfile() {
  return (
    <div
      className="profile-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay" />

      <div className="profile-card">
        <h1 className="title">Your profile</h1>
        <p className="subtitle">
          Customize your profile for personalized movie recommendations.
        </p>

        <div className="profile-content">
          {/* Avatar */}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img src={avatar} alt="Profile" />
              <button className="camera-btn">📷</button>
            </div>
          </div>

          {/* Form */}
          <form className="profile-form">
            <label>
              Full name
              <input type="text" placeholder="Your full name" />
            </label>

            <label>
              Email
              <input type="email" placeholder="Your email" />
            </label>

            <label>
              Phone number
              <input type="tel" placeholder="Your phone number" />
            </label>

            <label>
              Location
              <select>
                <option>Select your country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
              </select>
            </label>

            <label>
              About me
              <textarea placeholder="Tell something about yourself" />
            </label>

            <div className="form-actions">
              <button type="button" className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
