require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weatherRoutes');
const alertRoutes = require('./routes/alertRoutes');
const userRoutes = require('./routes/userRoutes');
const { setupWeatherMonitoring } = require('./services/weatherMonitor');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/users', userRoutes);

// Page d'accueil API
app.get('/', (req, res) => {
  res.json({ 
    message: '🐌 Bienvenue sur l\'API Escargot\'Alerte ! 🐌',
    status: 'online',
    endpoints: [
      '/api/weather - Données météo',
      '/api/alerts - Alertes escargots',
      '/api/users - Gestion des utilisateurs'
    ]
  });
});

// Connexion à MongoDB (si configuré)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));
} else {
  console.log('Mode sans MongoDB - Certaines fonctionnalités peuvent être limitées');
}

// Démarrer la surveillance météo
setupWeatherMonitoring();

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🐌 Serveur Escargot'Alerte démarré sur le port ${PORT}`);
});
