import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <div className="navbar-nav flex-row">
          {!isLoggedIn && location.pathname !== '/login' && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
          {!isLoggedIn && location.pathname !== '/signup' && (
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
          )}
          {isLoggedIn && location.pathname !== '/Home' && (
            <li className="nav-item">
              <Link className="nav-link" to="/Home">Home</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
            </li>
          )}
          {/* Ajoutez d'autres liens de navigation selon vos besoins */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
