// src/components/RegistrationModalFive.js
import React, { useState } from 'react';
import useWebAuthnRegistration from '../hooks/useWebAuthnRegistration';
import { useUser } from '../contexts/UserContext'; // Import useUser

const ModalFive = ({ onRegistrationComplete }) => {
  const { userDetails } = useUser(); // Use context
  console.log("Email in ModalFive:", userDetails.email);
  const { initiateWebAuthnRegistration, error } = useWebAuthnRegistration();
  const [registrationError, setRegistrationError] = useState('');

  const handleWebAuthnRegister = async () => {
    try {
      console.log("Attempting WebAuthn registration with email:", userDetails.email);
      const result = await initiateWebAuthnRegistration(userDetails.email); // Use email from context
      if (result && result.status === 'success') {
        onRegistrationComplete();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred during registration.';
      setRegistrationError(errorMessage);
    }
  };

  return (
    <div>
      <h2>WebAuthn Registration</h2>
      <p>Click the button below to complete your registration with WebAuthn. Your username is {userDetails.email}</p>
      <button onClick={handleWebAuthnRegister}>Register with WebAuthn</button>
      {registrationError && <p>Error: {registrationError}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ModalFive;
