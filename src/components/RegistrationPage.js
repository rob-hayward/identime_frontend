// RegistrationPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebAuthnRegistration from "../hooks/useWebAuthnRegistration";

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const { initiateWebAuthnRegistration, error } = useWebAuthnRegistration();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await initiateWebAuthnRegistration(username);
    if (result && result.status === 'success') {
      navigate('/dashboard'); // Redirect to the dashboard
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
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default RegistrationPage;
