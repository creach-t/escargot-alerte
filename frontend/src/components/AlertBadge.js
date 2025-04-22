import React from 'react';

const AlertBadge = ({ level, message }) => {
  // Définir les styles et les icônes en fonction du niveau d'alerte
  const getAlertStyle = () => {
    switch (level) {
      case 'high':
        return {
          className: 'alert alert-danger',
          icon: '⚠️',
          title: 'Alerte élevée'
        };
      case 'medium':
        return {
          className: 'alert alert-warning',
          icon: '⚠️',
          title: 'Alerte moyenne'
        };
      default:
        return {
          className: 'alert alert-success',
          icon: '✅',
          title: 'Faible risque'
        };
    }
  };
  
  const alertStyle = getAlertStyle();
  
  return (
    <div className={alertStyle.className}>
      <span className="alert-icon">{alertStyle.icon}</span>
      <div className="alert-content">
        <div className="alert-title">{alertStyle.title}</div>
        <p className="alert-message">{message}</p>
      </div>
    </div>
  );
};

export default AlertBadge;
