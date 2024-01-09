// useWebAuthnAuthentication.js

import { useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const useWebAuthnAuthentication = () => {
  const [error, setError] = useState(null); // State to track errors

  const initiateWebAuthnAuthentication = async (username) => {
    try {
      // Send username to the backend to get the authentication challenge
      const challengeResponse = await axiosInstance.post('/webauthn/login/challenge/', { username });
      const challengeOptions = challengeResponse.data;

      // Call the WebAuthn API to get an assertion
      const assertion = await navigator.credentials.get({ publicKey: challengeOptions });

      const authenticationResponse = {
        id: assertion.id,
        rawId: arrayBufferToBase64(assertion.rawId),
        response: {
          authenticatorData: arrayBufferToBase64(assertion.response.authenticatorData),
          clientDataJSON: arrayBufferToBase64(assertion.response.clientDataJSON),
          signature: arrayBufferToBase64(assertion.response.signature),
          userHandle: arrayBufferToBase64(assertion.response.userHandle),
        },
        type: assertion.type,
      };

      // Send the assertion back to the server for verification
      await axiosInstance.post('/webauthn/login/response/', authenticationResponse);
    } catch (e) {
      console.error(e);
      setError(e); // Set error state
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  };

  return { initiateWebAuthnAuthentication, error };
};

export default useWebAuthnAuthentication;
