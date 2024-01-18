// RegistrationPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebAuthnRegistration from "../hooks/useWebAuthnRegistration";

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const { initiateWebAuthnRegistration } = useWebAuthnRegistration();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await initiateWebAuthnRegistration(username);
      if (result && result.status === 'success') {
        navigate('/dashboard'); // Redirect to the dashboard
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred during registration.';
      setRegistrationError(errorMessage);
    }
  };

  return (
    <div>
      <h2>WebAuthn Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit">Register with WebAuthn</button>
      </form>
      {registrationError && <p>Error: {registrationError}</p>}
    </div>
  );
};

export default RegistrationPage;
