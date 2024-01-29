// src/components/RegistrationModalFour.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

const ModalFour = ({ nextStep }) => {
  const { userDetails, updateUserDetails } = useUser();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const scriptId = 'google-places-script-modal-four'; // Moved outside the function

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (document.getElementById(scriptId)) return;

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfkiQLsP_xb9VAl9uV0xzft6_RW-yzcqU&libraries=places`;
      script.async = true;
      script.onload = () => initializeAutocomplete();
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) document.body.removeChild(script);
    };
  }, [scriptId]); // Added scriptId as a dependency

  const initializeAutocomplete = () => {
    if (!window.google) {
      console.error("Google Maps JavaScript API not loaded");
      return;
    }
    const input = document.getElementById('address-input-modal-four');
    new window.google.maps.places.Autocomplete(input, { types: ['address'] });
  };

  // Debugging: Log the userDetails when the component mounts
  useEffect(() => {
    console.log("ModalFour - Initial User Details:", userDetails);
  }, [userDetails]); // Added userDetails as a dependency

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password mismatch");
      return;
    }
    updateUserDetails({ ...userDetails, fullName, address, password });
    console.log("Updated User Details on Submit:", { ...userDetails, fullName, address, password });
    nextStep();
  };

  return (
    <div>
      <h2>Welcome Back, {userDetails.preferredName}!</h2>
      <p>Thank you for verifying your email address: {userDetails.email}.</p>
      <p>Just a few more steps to complete your registration.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          id="address-input-modal-four"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter postcode"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Submit Information</button>
      </form>
    </div>
  );
};

export default ModalFour;
