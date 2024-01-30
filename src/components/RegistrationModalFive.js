// src/components/RegistrationModalFive.js
import React, { useState } from 'react';
import './RegistrationModalFive.css';
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
    <div className="modalContainerFive"> {/* Apply the CSS class */}
      <img src={`${process.env.PUBLIC_URL}/AuthenTechLogo.png`} alt="AuthenTech Logo" className="logoSmall"/>
      <p className="paragraphFive">
        Complete your AuthenTech registration by using finger print or face scan on you device with WebAuthn.
      </p>
      <button className="buttonFive" onClick={handleWebAuthnRegister}>Register with WebAuthn</button>
      {registrationError && <p className="errorFive">Error: {registrationError}</p>}
      {error && <p className="errorFive">Error: {error.message}</p>}
      <div className="step-indicator">Step 5 of 5</div>
    </div>
  );
};

export default ModalFive;