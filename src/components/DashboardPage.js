// src/components/DashboardPage.js

import React from 'react';
import useLogout from '../hooks/useLogout';
import { useUser } from '../contexts/UserContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { userDetails } = useUser();
  const logout = useLogout();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};

export default DashboardPage;
