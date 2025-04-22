import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// CSS spécifique pour Leaflet
import 'leaflet/dist/leaflet.css';

// Corriger l'icône de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage = ({ location }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([48.856614, 2.3522219]); // Paris par défaut
  const [mapZoom, setMapZoom] = useState(12);
  
  useEffect(() => {
    if (location) {
      // Mettre à jour le centre de la carte avec la localisation de l'utilisateur
      setMapCenter([location.lat, location.lon]);
      fetchAlerts();
    }
  }, [location]);
  
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      
      // Récupérer les alertes depuis l'API
      const response = await axios.get(`/api/alerts?lat=${location.lat}&lon=${location.lon}&radius=50`);
      setAlerts(response.data);
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des alertes:', err);
      setError('Impossible de récupérer les alertes. Veuillez réessayer plus tard.');
      setLoading(false);
      
      // En mode développement, utiliser des données fictives
      if (process.env.NODE_ENV === 'development') {
        setAlerts([
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
          }
        ]);
        setLoading(false);
      }
    }
  };
  
  const getAlertColor = (level) => {
    switch (level) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };
  
  const handleNewAlert = () => {
    // Dans une version complète, ouvrir un modal pour créer une nouvelle alerte
    alert('Fonctionnalité de signalement à venir dans une prochaine version !');
  };
  
  if (loading && !alerts.length) {
    return (
      <div className="container">
        <div className="loading-message">
          <div className="loading-icon">🐌</div>
          <p>Chargement de la carte...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="map-page">
      <div className="container">
        <div className="map-header">
          <h1>Carte des alertes escargots</h1>
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
        
        <div className="map-container">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '500px', width: '100%', borderRadius: 'var(--border-radius)' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Marqueur de l'utilisateur */}
            <Marker position={[location.lat, location.lon]}>
              <Popup>
                <strong>Votre position</strong>
              </Popup>
            </Marker>
            
            {/* Cercle autour de l'utilisateur (rayon de 10km) */}
            <Circle
              center={[location.lat, location.lon]}
              radius={10000}
              pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue', weight: 1 }}
            />
            
            {/* Alertes */}
            {alerts.map(alert => (
              <Marker
                key={alert.id}
                position={[alert.location.lat, alert.location.lon]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="background-color: ${getAlertColor(alert.level)}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">🐌</div>`,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
                })}
              >
                <Popup>
                  <div className="alert-popup">
                    <h3>{alert.level === 'high' ? 'Alerte élevée' : 'Alerte moyenne'}</h3>
                    <p>{alert.message}</p>
                    <p className="alert-location">{alert.location.name || 'Lieu non spécifié'}</p>
                    <p className="alert-date">Signalé le {new Date(alert.createdAt).toLocaleDateString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="map-legend">
          <h3>Légende</h3>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
            <span>Alerte élevée - Nombreux escargots</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>Alerte moyenne - Quelques escargots</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'blue' }}></div>
            <span>Votre position (rayon de 10km)</span>
          </div>
        </div>
        
        <div className="map-info">
          <h3>Comment utiliser cette carte</h3>
          <p>
            Cette carte affiche les zones où des escargots ont été signalés. Les marqueurs colorés indiquent le niveau d'alerte :
            rouge pour une forte présence, orange pour une présence modérée.
          </p>
          <p>
            Cliquez sur un marqueur pour voir plus de détails sur l'alerte.
            Vous pouvez signaler vous-même la présence d'escargots en cliquant sur le bouton "Signaler des escargots".
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
