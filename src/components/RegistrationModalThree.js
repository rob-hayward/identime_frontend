// src/components/RegistrationModalThree.js
import React from 'react';
import { useUser } from '../contexts/UserContext'; // Import useUser

const ModalThree = ({ handleResendEmail }) => {
  const { userDetails } = useUser(); // Use context

  return (
    <div>
      <h2>Verify Your Email</h2>
      <p>Thank you for providing your email address, {userDetails.preferredName}. Please check your inbox for {userDetails.email} and click on the link provided to verify.</p>
      <button onClick={handleResendEmail}>Did not receive an email? Click here to resend</button>
    </div>
  );
};

export default ModalThree;
