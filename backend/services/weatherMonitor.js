const schedule = require('node-schedule');
const { analyzeConditions } = require('./weatherService');

// Liste fictive de zones à surveiller
const MONITORED_LOCATIONS = [
  { name: 'Paris', lat: 48.856614, lon: 2.3522219 },
  { name: 'Lyon', lat: 45.764043, lon: 4.835659 },
  { name: 'Marseille', lat: 43.296482, lon: 5.36978 },
  { name: 'Bordeaux', lat: 44.837789, lon: -0.57918 }
];

// Stocker les alertes actives (en mémoire pour le MVP)
const activeAlerts = [];

/**
 * Vérifie les conditions pour tous les lieux surveillés
 * et génère des alertes si nécessaire
 */
async function checkAllLocations() {
  console.log(`🔍 Vérification des conditions météo pour ${MONITORED_LOCATIONS.length} lieux...`);
  
  try {
    for (const location of MONITORED_LOCATIONS) {
      await checkLocationConditions(location);
    }
    
    console.log(`✅ Vérification terminée. ${activeAlerts.length} alertes actives.`);
  } catch (error) {
    console.error('Erreur lors de la vérification des conditions:', error);
  }
}

/**
 * Vérifie les conditions pour un lieu spécifique
 * @param {Object} location - Le lieu à vérifier
 */
async function checkLocationConditions(location) {
  try {
    // Analyser les conditions pour ce lieu
    const analysis = await analyzeConditions(location.lat, location.lon);
    
    // Si le niveau d'alerte est medium ou high, créer ou mettre à jour une alerte
    if (analysis.analysis.alertLevel !== 'low') {
      createOrUpdateAlert(location, analysis);
    } else {
      // Sinon, supprimer toute alerte existante pour ce lieu
      removeAlertsForLocation(location);
    }
  } catch (error) {
    console.error(`Erreur lors de la vérification de ${location.name}:`, error);
  }
}

/**
 * Crée ou met à jour une alerte pour un lieu
 * @param {Object} location - Le lieu concerné
 * @param {Object} analysis - L'analyse des conditions
 */
function createOrUpdateAlert(location, analysis) {
  // Vérifier si une alerte existe déjà pour ce lieu
  const existingAlertIndex = activeAlerts.findIndex(
    alert => alert.location.lat === location.lat && alert.location.lon === location.lon
  );
  
  const alertData = {
    id: existingAlertIndex >= 0 ? activeAlerts[existingAlertIndex].id : Date.now().toString(),
    type: 'escargot',
    level: analysis.analysis.alertLevel,
    message: analysis.analysis.message,
    location: {
      name: location.name,
      lat: location.lat,
      lon: location.lon
    },
    score: analysis.analysis.escargotActivityScore,
    createdAt: existingAlertIndex >= 0 ? activeAlerts[existingAlertIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // 6h d'expiration
  };
  
  if (existingAlertIndex >= 0) {
    // Mettre à jour l'alerte existante
    activeAlerts[existingAlertIndex] = alertData;
    console.log(`🔄 Alerte mise à jour pour ${location.name} (Niveau: ${alertData.level})`);
  } else {
    // Créer une nouvelle alerte
    activeAlerts.push(alertData);
    console.log(`🚨 Nouvelle alerte pour ${location.name} (Niveau: ${alertData.level})`);
    
    // Ici, vous pourriez envoyer des notifications push aux utilisateurs
    // sendPushNotifications(alertData);
  }
}

/**
 * Supprime les alertes pour un lieu donné
 * @param {Object} location - Le lieu concerné
 */
function removeAlertsForLocation(location) {
  const initialCount = activeAlerts.length;
  
  // Filtrer les alertes pour supprimer celles du lieu spécifié
  const filteredAlerts = activeAlerts.filter(
    alert => !(alert.location.lat === location.lat && alert.location.lon === location.lon)
  );
  
  // Mettre à jour la liste des alertes actives
  if (initialCount !== filteredAlerts.length) {
    console.log(`🔕 Alerte(s) supprimée(s) pour ${location.name}`);
    activeAlerts.length = 0;
    activeAlerts.push(...filteredAlerts);
  }
}

/**
 * Récupère toutes les alertes actives
 * @returns {Array} - Liste des alertes actives
 */
function getActiveAlerts() {
  // Filtrer les alertes expirées
  const now = new Date().toISOString();
  return activeAlerts.filter(alert => alert.expiresAt > now);
}

/**
 * Récupère les alertes actives pour une zone spécifique
 * @param {number} lat - Latitude du centre de la zone
 * @param {number} lon - Longitude du centre de la zone
 * @param {number} radius - Rayon de la zone en km (par défaut 10km)
 * @returns {Array} - Liste des alertes dans la zone
 */
function getAlertsInRadius(lat, lon, radius = 10) {
  const activeAlertList = getActiveAlerts();
  
  // Filtrer les alertes dans le rayon spécifié
  // Note: ceci est une implémentation simplifiée qui n'utilise pas la distance réelle
  // En production, vous utiliseriez une formule de distance haversine
  return activeAlertList.filter(alert => {
    const distance = calculateDistance(
      lat, lon,
      alert.location.lat, alert.location.lon
    );
    return distance <= radius;
  });
}

/**
 * Calcule la distance approximative entre deux points (formule de Haversine)
 * @param {number} lat1 - Latitude du point 1
 * @param {number} lon1 - Longitude du point 1
 * @param {number} lat2 - Latitude du point 2
 * @param {number} lon2 - Longitude du point 2
 * @returns {number} - Distance en km
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Configure le monitoring météo périodique
 */
function setupWeatherMonitoring() {
  console.log('🐌 Démarrage du système de surveillance météo pour les escargots');
  
  // Vérification immédiate au démarrage
  checkAllLocations();
  
  // Planifier des vérifications régulières (toutes les heures)
  schedule.scheduleJob('0 * * * *', checkAllLocations);
  
  console.log('✅ Monitoring météo configuré et actif');
}

module.exports = {
  setupWeatherMonitoring,
  getActiveAlerts,
  getAlertsInRadius,
  checkLocationConditions
};
