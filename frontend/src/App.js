import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';
import InfoPage from './pages/InfoPage';

// Styles
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Récupérer la géolocalisation de l'utilisateur au chargement
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          // Position par défaut (Paris)
          setLocation({ lat: 48.856614, lon: 2.3522219 });
          setLoading(false);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur');
      setLocation({ lat: 48.856614, lon: 2.3522219 });
      setLoading(false);
    }
  }, []);
  
  // Simuler une connexion automatique avec un profil test
  useEffect(() => {
    // En production, vous vérifieriez un token stocké
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        // Créer un utilisateur factice pour le MVP
        setUser({
          name: 'Utilisateur Test',
          settings: {
            notificationsEnabled: true,
            alertRadius: 10
          }
        });
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Si l'application est en cours de chargement
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon">🐌</div>
        <p>Chargement d'Escargot'Alerte...</p>
      </div>
    );
  }
  
  return (
    <div className="app">
      <Navbar user={user} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage location={location} />} />
          <Route path="/map" element={<MapPage location={location} />} />
          <Route path="/alerts" element={<AlertsPage location={location} />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
