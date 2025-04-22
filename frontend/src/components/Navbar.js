import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="navbar-logo">
          🐌 <span>Escargot'Alerte</span>
        </div>
        
        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
            end
          >
            <span className="navbar-link-icon">🏠</span>
            <span>Accueil</span>
          </NavLink>
          
          <NavLink 
            to="/map" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            <span className="navbar-link-icon">🗺️</span>
            <span>Carte</span>
          </NavLink>
          
          <NavLink 
            to="/alerts" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            <span className="navbar-link-icon">🚨</span>
            <span>Alertes</span>
          </NavLink>
          
          <NavLink 
            to="/info" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            <span className="navbar-link-icon">ℹ️</span>
            <span>Infos</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            <span className="navbar-link-icon">👤</span>
            <span>{user?.name ? user.name.split(' ')[0] : 'Profil'}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
