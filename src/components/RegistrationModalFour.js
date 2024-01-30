// src/components/RegistrationModalFour.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import './RegistrationModalFour.css';

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

  // Function to initialize the Google Places Autocomplete
const initializeAutocomplete = () => {
  if (!window.google) {
    console.error("Google Maps JavaScript API not loaded");
    return;
  }
  const input = document.getElementById('address-input-modal-four');
  const autocomplete = new window.google.maps.places.Autocomplete(input, { types: ['address'] });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.address_components) {
      const postalCodeObject = place.address_components.find(component => component.types.includes('postal_code'));
      const postalCode = postalCodeObject ? postalCodeObject.long_name : '';
      console.log("Postal Code:", postalCode);
      // You can then use the postal code as needed
    }
  });
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
      <div className="modalContainerFour">
      <h2 className="headingFour">Welcome back, {userDetails.preferredName}!</h2>
      <p className="descriptionFour">Thank you for verifying your email address: {userDetails.email}.</p>
        <form onSubmit={handleSubmit} className="formFour">
          <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
          />
          <textarea
            id="address-input-modal-four"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Start Typing Your Address"
            required
          ></textarea>
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
          <button type="submit" className="submitButtonFour">Submit Information</button>
      </form>
      <div className="step-indicator">Step 4 of 5</div>
    </div>
  );
};

export default ModalFour;
