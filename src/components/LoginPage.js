// LoginPage.js

import React, { useState } from 'react';
import useWebAuthnAuthentication from '../hooks/useWebAuthnAuthentication';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { initiateWebAuthnAuthentication, error } = useWebAuthnAuthentication();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await initiateWebAuthnAuthentication(username);
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
