// src/App.js

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import DashboardPage from './components/DashboardPage';
import EmailVerification from './components/EmailVerification';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
          <Routes>
              <Route path="/" element={<WelcomePage/>} exact/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegistrationPage/>}/>
              <Route path="/dashboard" element={<DashboardPage/>}/>
              <Route path="/verify-email/:token" element={<EmailVerification/>}/>
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


