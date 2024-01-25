// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebAuthnAuthentication from '../hooks/useWebAuthnAuthentication';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { initiateWebAuthnAuthentication, error } = useWebAuthnAuthentication();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await initiateWebAuthnAuthentication(username);
    if (response && response.status === 'success') {
      navigate('/dashboard');  // Redirect to dashboard upon successful login
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit">Login with WebAuthn</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default LoginPage;
