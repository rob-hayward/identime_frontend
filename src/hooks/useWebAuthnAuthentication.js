import { useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const useWebAuthnAuthentication = () => {
  const [error, setError] = useState(null);

  const initiateWebAuthnAuthentication = async (username) => {
    try {
      // Requesting the challenge from the server
      const challengeResponse = await axiosInstance.post('/webauthn/login/challenge/', { username });
      const challengeOptions = challengeResponse.data;

      // Converting the challenge from Base64URL to Uint8Array
      challengeOptions.challenge = base64urlToUint8Array(challengeOptions.challenge);

      if (challengeOptions.allowCredentials) {
        challengeOptions.allowCredentials = challengeOptions.allowCredentials.map(cred => {
          return { ...cred, id: base64urlToUint8Array(cred.id) };
        });
      }

      // Requesting the assertion from the authenticator
      const assertion = await navigator.credentials.get({ publicKey: challengeOptions });

      // Convert parts of the response to Base64URL and rawId to Hexadecimal
      const authenticatorData = arrayBufferToBase64(assertion.response.authenticatorData);
      const clientDataJSON = arrayBufferToBase64(assertion.response.clientDataJSON);
      const signature = arrayBufferToBase64(assertion.response.signature);
      const userHandle = assertion.response.userHandle ? arrayBufferToBase64(assertion.response.userHandle) : null;
      const rawIdHex = arrayBufferToHex(assertion.rawId); // Converting rawId to Hexadecimal string

      // Constructing the authentication response object
      const authenticationResponse = {
        credential_id: rawIdHex,
        authenticator_data: authenticatorData,
        client_data_json: clientDataJSON,
        signature: signature,
        user_handle: userHandle,
        raw_id: rawIdHex
      };

      // Logging the authentication response
      console.log("Sending Authentication Response:", JSON.stringify(authenticationResponse, null, 2));

      // Sending the authentication response to the server
      await axiosInstance.post('/webauthn/login/response/', authenticationResponse);
    } catch (e) {
      console.error("Authentication error:", e);
      setError(e);
    }
  };

  // Helper function to convert Base64URL to Uint8Array
  const base64urlToUint8Array = (base64url) => {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  };

  // Helper function to convert ArrayBuffer to Base64URL
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Helper function to convert ArrayBuffer to Hexadecimal
  const arrayBufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  return { initiateWebAuthnAuthentication, error };
};

export default useWebAuthnAuthentication;
