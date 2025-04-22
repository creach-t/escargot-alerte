import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-logo">
          🐌 Escargot'Alerte
        </div>
        
        <div className="footer-links">
          <Link to="/" className="footer-link">Accueil</Link>
          <Link to="/map" className="footer-link">Carte</Link>
          <Link to="/alerts" className="footer-link">Alertes</Link>
          <Link to="/info" className="footer-link">À propos</Link>
          <Link to="/profile" className="footer-link">Profil</Link>
        </div>
        
        <div className="footer-links">
          <a href="#" className="footer-link">Conditions d'utilisation</a>
          <a href="#" className="footer-link">Politique de confidentialité</a>
          <a href="#" className="footer-link">Nous contacter</a>
        </div>
        
        <div className="footer-copyright">
          © {new Date().getFullYear()} Escargot'Alerte - Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
