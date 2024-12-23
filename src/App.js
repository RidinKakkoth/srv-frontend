import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userOnline = JSON.parse(localStorage.getItem("user"));
    
    if (token && userOnline) { 
      setUser(userOnline);
    } else {
      setUser(null); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    window.location.href = "/login";
  };

  // Check user's role
  const isAdmin = user && user.role === 'admin';
  const isUser = user && user.role === 'user';

  return (
    <Router>
      <div>
        {user && <Navbar userName={user.name} onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                isAdmin ? (
                  <AdminDashboard />  
                ) : isUser ? (
                  <UserDashboard />  
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
