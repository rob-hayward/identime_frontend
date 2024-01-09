// RegistrationPage.js

import React, {useEffect, useState} from 'react';
import useWebAuthnRegistration from "../hooks/useWebAuthnRegistration";

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const { initiateWebAuthnRegistration, error } = useWebAuthnRegistration();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await initiateWebAuthnRegistration(username);
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
