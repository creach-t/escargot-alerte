import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Composants
import AlertBadge from '../components/AlertBadge';

const HomePage = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [escargotConditions, setEscargotConditions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Récupérer les données une fois que la localisation est disponible
    if (location) {
      fetchData();
    }
  }, [location]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les conditions météo actuelles
      const weatherResponse = await axios.get(`/api/weather/current?lat=${location.lat}&lon=${location.lon}`);
      setWeatherData(weatherResponse.data);
      
      // Récupérer l'analyse des conditions pour les escargots
      const conditionsResponse = await axios.get(`/api/weather/escargot-conditions?lat=${location.lat}&lon=${location.lon}`);
      setEscargotConditions(conditionsResponse.data);
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError('Impossible de récupérer les données. Veuillez réessayer plus tard.');
      setLoading(false);
      
      // En mode développement, utiliser des données fictives
      if (process.env.NODE_ENV === 'development') {
        setWeatherData({
          location: { name: 'Votre position' },
          current: { 
            temp: 18.5, 
            humidity: 85,
            weather: 'Partiellement nuageux'
          }
        });
        
        setEscargotConditions({
          analysis: {
            escargotActivityScore: 75,
            alertLevel: 'medium',
            message: 'Conditions favorables aux escargots. La météo récente pourrait encourager leur activité. Soyez attentifs.'
          }
        });
      }
    }
  };
  
  // Fonction pour obtenir une couleur basée sur le niveau d'alerte
  const getAlertColor = (level) => {
    switch (level) {
      case 'high':
        return 'var(--danger)';
      case 'medium':
        return 'var(--warning)';
      default:
        return 'var(--success)';
    }
  };
  
  // Fonction pour le rendu du score d'activité
  const renderActivityScore = (score) => {
    return (
      <div className="activity-score">
        <div className="score-bar">
          <div 
            className="score-fill" 
            style={{ 
              width: `${score}%`, 
              backgroundColor: score > 70 ? 'var(--danger)' : score > 40 ? 'var(--warning)' : 'var(--success)' 
            }}
          ></div>
        </div>
        <div className="score-value">{score}%</div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="container">
        <div className="loading-message">
          <div className="loading-icon">🐌</div>
          <p>Analyse des conditions météo en cours...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Oups ! 🐌</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchData}>Réessayer</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="home-page">
      <div className="hero-section" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="container">
          <h1>Bienvenue sur Escargot'Alerte ! 🐌</h1>
          <p className="hero-subtitle">
            Votre système d'alerte pour protéger les escargots quand les conditions météo sont favorables à leur sortie.
          </p>
        </div>
      </div>
      
      <div className="container">
        <div className="current-status-section">
          <div className="card">
            <div className="card-header">
              <h2>Conditions actuelles à {weatherData?.location?.name || 'Votre position'}</h2>
            </div>
            <div className="card-body">
              {escargotConditions && (
                <AlertBadge 
                  level={escargotConditions.analysis.alertLevel}
                  message={escargotConditions.analysis.message}
                />
              )}
              
              <div className="weather-info">
                <div className="weather-detail">
                  <span className="weather-icon">🌡️</span>
                  <span className="weather-value">{weatherData?.current?.temp || '—'}°C</span>
                  <span className="weather-label">Température</span>
                </div>
                
                <div className="weather-detail">
                  <span className="weather-icon">💧</span>
                  <span className="weather-value">{weatherData?.current?.humidity || '—'}%</span>
                  <span className="weather-label">Humidité</span>
                </div>
                
                <div className="weather-detail">
                  <span className="weather-icon">☁️</span>
                  <span className="weather-value">{weatherData?.current?.weather || '—'}</span>
                  <span className="weather-label">Conditions</span>
                </div>
              </div>
              
              {escargotConditions && (
                <div className="escargot-activity">
                  <h3>Activité escargot estimée :</h3>
                  {renderActivityScore(escargotConditions.analysis.escargotActivityScore)}
                </div>
              )}
            </div>
            <div className="card-footer">
              <Link to="/map" className="btn btn-primary">
                <span className="btn-icon">🗺️</span>
                Voir la carte des alertes
              </Link>
              <button onClick={fetchData} className="btn btn-outline">
                <span className="btn-icon">🔄</span>
                Actualiser
              </button>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h2>Quand les escargots sortent-ils ?</h2>
          <div className="info-cards">
            <div className="card">
              <div className="card-header">
                <h3>Conditions idéales 🌧️</h3>
              </div>
              <div className="card-body">
                <p>Les escargots adorent sortir quand il fait humide, particulièrement après une averse suivie de temps doux. Ils ont besoin d'humidité pour se déplacer facilement.</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3>Température parfaite 🌡️</h3>
              </div>
              <div className="card-body">
                <p>La température idéale pour les escargots se situe entre 15°C et 20°C. Trop froid ou trop chaud, ils restent cachés.</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3>Périodes actives 🌙</h3>
              </div>
              <div className="card-body">
                <p>Les escargots sont principalement actifs le soir et la nuit, lorsque l'humidité est plus élevée et les températures plus douces.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="action-section">
          <h2>Comment aider les escargots ?</h2>
          <div className="action-steps">
            <div className="action-step">
              <div className="action-icon">👀</div>
              <h3>Observez</h3>
              <p>Soyez attentif aux alertes de l'application et observez votre environnement quand les conditions sont favorables.</p>
            </div>
            
            <div className="action-step">
              <div className="action-icon">⚠️</div>
              <h3>Signalez</h3>
              <p>Signalez les zones où vous observez de nombreux escargots pour aider les autres utilisateurs.</p>
            </div>
            
            <div className="action-step">
              <div className="action-icon">🛡️</div>
              <h3>Protégez</h3>
              <p>Déplacez les escargots en sécurité s'ils se trouvent sur des routes ou des chemins fréquentés.</p>
            </div>
          </div>
          
          <Link to="/info" className="btn btn-secondary">
            En savoir plus sur la protection des escargots
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
