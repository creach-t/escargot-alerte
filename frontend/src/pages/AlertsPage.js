import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Composants
import AlertBadge from '../components/AlertBadge';

const AlertsPage = ({ location }) => {
  const [alerts, setAlerts] = useState([]);
  const [localAlerts, setLocalAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (location) {
      fetchAlerts();
    }
  }, [location]);
  
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      
      // Récupérer les alertes générales
      const alertsResponse = await axios.get('/api/alerts');
      
      // Récupérer les alertes locales (dans un rayon de 10km)
      const localAlertsResponse = await axios.get(`/api/alerts?lat=${location.lat}&lon=${location.lon}&radius=10`);
      
      setAlerts(alertsResponse.data);
      setLocalAlerts(localAlertsResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des alertes:', err);
      setError('Impossible de récupérer les alertes. Veuillez réessayer plus tard.');
      setLoading(false);
      
      // En mode développement, utiliser des données fictives
      if (process.env.NODE_ENV === 'development') {
        // Données fictives
        const mockAlerts = [
          {
            id: '1',
            type: 'escargot',
            level: 'high',
            message: 'Conditions idéales pour les escargots ! Nombreuses observations signalées.',
            location: {
              lat: location.lat + 0.01,
              lon: location.lon - 0.01,
              name: 'Parc à proximité'
            },
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            type: 'escargot',
            level: 'medium',
            message: 'Conditions favorables aux escargots. Quelques observations signalées.',
            location: {
              lat: location.lat - 0.008,
              lon: location.lon + 0.005,
              name: 'Route forestière'
            },
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            type: 'escargot',
            level: 'high',
            message: 'Forte présence d\'escargots après la pluie d\'hier soir.',
            location: {
              lat: 48.8566,
              lon: 2.3522,
              name: 'Paris'
            },
            createdAt: new Date(Date.now() - 86400000).toISOString() // 1 jour avant
          },
          {
            id: '4',
            type: 'escargot',
            level: 'medium',
            message: 'Conditions humides favorables aux escargots.',
            location: {
              lat: 45.7640,
              lon: 4.8357,
              name: 'Lyon'
            },
            createdAt: new Date(Date.now() - 172800000).toISOString() // 2 jours avant
          }
        ];
        
        setAlerts(mockAlerts);
        setLocalAlerts(mockAlerts.slice(0, 2)); // Seulement les 2 premiers pour les alertes locales
        setLoading(false);
      }
    }
  };
  
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleNewAlert = () => {
    // Dans une version complète, ouvrir un modal pour créer une nouvelle alerte
    alert('Fonctionnalité de signalement à venir dans une prochaine version !');
  };
  
  if (loading) {
    return (
      <div className="container">
        <div className="loading-message">
          <div className="loading-icon">🐌</div>
          <p>Chargement des alertes...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="alerts-page">
      <div className="container">
        <div className="alerts-header">
          <h1>Alertes escargots</h1>
          <button onClick={handleNewAlert} className="btn btn-primary">
            <span className="btn-icon">🐌</span>
            Signaler des escargots
          </button>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            <span className="alert-icon">⚠️</span>
            <div className="alert-content">
              <p>{error}</p>
              <button onClick={fetchAlerts} className="btn btn-sm btn-outline">Réessayer</button>
            </div>
          </div>
        )}
        
        <div className="alerts-section">
          <h2>Alertes près de vous</h2>
          
          {localAlerts.length > 0 ? (
            <div className="alerts-list">
              {localAlerts.map(alert => (
                <div key={alert.id} className="alert-card card">
                  <div className="card-body">
                    <div className="alert-card-header">
                      <h3>{alert.location.name || 'Lieu non spécifié'}</h3>
                      <span className={`alert-badge alert-${alert.level}`}>
                        {alert.level === 'high' ? 'Élevée' : 'Moyenne'}
                      </span>
                    </div>
                    
                    <AlertBadge level={alert.level} message={alert.message} />
                    
                    <div className="alert-details">
                      <p className="alert-date">
                        <span className="icon">🕒</span>
                        Signalé le {formatDate(alert.createdAt)}
                      </p>
                      <Link to="/map" className="btn btn-sm btn-outline">
                        <span className="btn-icon">🗺️</span>
                        Voir sur la carte
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-alerts">Aucune alerte dans votre zone pour le moment.</p>
          )}
        </div>
        
        <div className="alerts-section">
          <h2>Alertes récentes en France</h2>
          
          {alerts.length > 0 ? (
            <div className="alerts-list">
              {alerts.map(alert => (
                <div key={alert.id} className="alert-card card">
                  <div className="card-body">
                    <div className="alert-card-header">
                      <h3>{alert.location.name || 'Lieu non spécifié'}</h3>
                      <span className={`alert-badge alert-${alert.level}`}>
                        {alert.level === 'high' ? 'Élevée' : 'Moyenne'}
                      </span>
                    </div>
                    
                    <p className="alert-message">{alert.message}</p>
                    
                    <div className="alert-details">
                      <p className="alert-date">
                        <span className="icon">🕒</span>
                        Signalé le {formatDate(alert.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-alerts">Aucune alerte disponible pour le moment.</p>
          )}
        </div>
        
        <div className="alerts-info">
          <h3>À propos des alertes</h3>
          <p>
            Les alertes sont générées automatiquement en fonction des conditions météorologiques favorables
            à la sortie des escargots, ainsi que des signalements des utilisateurs.
          </p>
          <p>
            Si vous observez de nombreux escargots dans une zone non signalée, n'hésitez pas à créer une alerte
            pour aider les autres utilisateurs à les protéger.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
