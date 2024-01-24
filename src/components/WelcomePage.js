// WelcomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to Identime</h1>
      <p>Select an option:</p>
      <div>
        <h3>WebAuthn Options</h3>
        <Link to="/login">Login with WebAuthn</Link>
        <br />
        <Link to="/register">Register with WebAuthn</Link>
      </div>
      <br />
      <div>
        <h3>Simple Options</h3>
        <Link to="/simple-login">Simple Login</Link>
        <br />
        <Link to="/simple-register">Simple Register</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
