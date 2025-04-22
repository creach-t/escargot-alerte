import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // État local pour les paramètres modifiables
  const [settings, setSettings] = useState({
    notificationsEnabled: user?.settings?.notificationsEnabled || true,
    alertRadius: user?.settings?.alertRadius || 10
  });
  
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const saveSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Appel API pour sauvegarder les paramètres
      const response = await axios.put('/api/users/settings', settings);
      
      // Mettre à jour l'utilisateur avec les nouveaux paramètres
      setUser({
        ...user,
        settings: response.data.settings
      });
      
      setSuccess('Paramètres mis à jour avec succès!');
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour des paramètres:', err);
      setError('Impossible de mettre à jour les paramètres. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };
  
  // Si aucun utilisateur n'est défini
  if (!user) {
    return (
      <div className="container">
        <div className="loading-message">
          <div className="loading-icon">🐌</div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="profile-page">
      <div className="container">
        <h1>Profil utilisateur</h1>
        
        <div className="card profile-card">
          <div className="card-header">
            <h2>Informations personnelles</h2>
          </div>
          <div className="card-body">
            <div className="profile-info">
              <div className="profile-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="profile-details">
                <h3>{user.name || 'Utilisateur'}</h3>
                <p className="profile-email">{user.email || 'Email non défini'}</p>
                <p className="profile-joined">Membre depuis: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card settings-card">
          <div className="card-header">
            <h2>Paramètres</h2>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger">
                <span className="alert-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                <p>{success}</p>
              </div>
            )}
            
            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">Notifications</label>
                <div className="form-toggle">
                  <input
                    type="checkbox"
                    id="notificationsEnabled"
                    name="notificationsEnabled"
                    checked={settings.notificationsEnabled}
                    onChange={handleSettingsChange}
                  />
                  <label htmlFor="notificationsEnabled" className="toggle-label">
                    {settings.notificationsEnabled ? 'Activées' : 'Désactivées'}
                  </label>
                </div>
                <p className="form-help">Recevez des alertes quand les escargots sont actifs près de chez vous</p>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="alertRadius">Rayon d'alerte (km)</label>
                <input
                  type="range"
                  id="alertRadius"
                  name="alertRadius"
                  min="1"
                  max="50"
                  step="1"
                  value={settings.alertRadius}
                  onChange={handleSettingsChange}
                  className="form-range"
                />
                <div className="range-value">{settings.alertRadius} km</div>
                <p className="form-help">Distance maximale pour recevoir des alertes</p>
              </div>
              
              <button 
                onClick={saveSettings} 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Enregistrer les paramètres'}
              </button>
            </div>
          </div>
        </div>
        
        {user.stats && (
          <div className="card stats-card">
            <div className="card-header">
              <h2>Vos statistiques</h2>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">🐌</div>
                  <div className="stat-value">{user.stats.escargotsSaved || 0}</div>
                  <div className="stat-label">Escargots sauvés</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">🚨</div>
                  <div className="stat-value">{user.stats.alertsCreated || 0}</div>
                  <div className="stat-label">Alertes créées</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-value">Débutant</div>
                  <div className="stat-label">Niveau</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="card help-card">
          <div className="card-header">
            <h2>Aide et assistance</h2>
          </div>
          <div className="card-body">
            <p>
              Besoin d'aide pour utiliser l'application ? Vous avez des questions ou des suggestions ?
              N'hésitez pas à nous contacter !
            </p>
            <div className="help-buttons">
              <button className="btn btn-outline">
                <span className="btn-icon">📖</span>
                Guide d'utilisation
              </button>
              <button className="btn btn-outline">
                <span className="btn-icon">✉️</span>
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
