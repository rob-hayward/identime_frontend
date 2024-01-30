// DashboardPage.js

import React, { useState } from 'react';
import useLogout from '../hooks/useLogout';
import './DashboardPage.css'; // Make sure to create this CSS file

const DashboardPage = () => {
  const logout = useLogout();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated user information logic here
    console.log("Updated user info:", userInfo);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <form onSubmit={handleSubmit} className="user-info-form">
        <label>
          Full Name:
          <input type="text" name="fullName" value={userInfo.fullName} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} />
        </label>
        <button type="submit" className="update-button">Update Info</button>
      </form>

      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};

export default DashboardPage;
