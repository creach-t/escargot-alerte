const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast, analyzeConditions } = require('../services/weatherService');

/**
 * @route GET /api/weather/current
 * @description Obtenir les données météo actuelles pour une localisation
 */
router.get('/current', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Les paramètres lat et lon sont requis' });
    }
    
    const weatherData = await getCurrentWeather(lat, lon);
    res.json(weatherData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route GET /api/weather/forecast
 * @description Obtenir les prévisions météo pour une localisation
 */
router.get('/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Les paramètres lat et lon sont requis' });
    }
    
    const forecastData = await getForecast(lat, lon);
    res.json(forecastData);
  } catch (error) {
    console.error('Erreur lors de la récupération des prévisions:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route GET /api/weather/escargot-conditions
 * @description Analyser les conditions pour la sortie des escargots
 */
router.get('/escargot-conditions', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Les paramètres lat et lon sont requis' });
    }
    
    const conditionsAnalysis = await analyzeConditions(lat, lon);
    res.json(conditionsAnalysis);
  } catch (error) {
    console.error('Erreur lors de l\'analyse des conditions:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
