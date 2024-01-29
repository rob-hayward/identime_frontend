// src/components/WelcomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
      <div className="welcome-page">
          {/* Logo Image */}
          <img src={`${process.env.PUBLIC_URL}/AuthenTechLogo.png`} alt="AuthenTech Logo" className="logo"/>

          <h1>AuthenTech</h1>
          <h2>Seamlessly Simple Personal Security</h2>
          <div className="paragraph-container">
              <ul>
                  <li>Advanced biometric authentication for robust security.</li>
                  <li>Convenience of one-touch, passwordless access.</li>
                  <li>Discover a user-friendly approach to digital safety.</li>
              </ul>
          </div>

          <div className="auth-options">
              <Link to="/register" className="auth-link">Register</Link>
              <Link to="/login" className="auth-link">Login</Link>
          </div>
      </div>
  );
};

export default WelcomePage;
