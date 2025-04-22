const express = require('express');
const router = express.Router();

/**
 * @route GET /api/alerts
 * @description Récupérer les alertes actives pour une zone
 */
router.get('/', async (req, res) => {
  try {
    const { lat, lon, radius } = req.query;
    
    // Logique pour récupérer les alertes dans un rayon donné
    // Simulons des données pour l'instant
    const alerts = [
      {
        id: '1',
        type: 'escargot',
        level: 'high',
        message: 'Conditions idéales pour les escargots ! Nombreuses observations signalées.',
        location: {
          lat: parseFloat(lat),
          lon: parseFloat(lon)
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24*60*60*1000).toISOString() // 24h plus tard
      }
    ];
    
    res.json(alerts);
  } catch (error) {
    console.error('Erreur lors de la récupération des alertes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route POST /api/alerts
 * @description Créer une nouvelle alerte (rapport d'utilisateur)
 */
router.post('/', async (req, res) => {
  try {
    const { type, level, message, lat, lon, userId } = req.body;
    
    if (!type || !level || !lat || !lon) {
      return res.status(400).json({ error: 'Tous les champs requis ne sont pas fournis' });
    }
    
    // Logique pour créer une nouvelle alerte
    // Dans une version complète, nous sauvegarderions dans une base de données
    
    const newAlert = {
      id: Date.now().toString(),
      type,
      level,
      message: message || 'Escargots signalés dans la zone',
      location: { lat, lon },
      reportedBy: userId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 6*60*60*1000).toISOString() // 6h plus tard
    };
    
    res.status(201).json(newAlert);
  } catch (error) {
    console.error('Erreur lors de la création d\'une alerte:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route DELETE /api/alerts/:id
 * @description Supprimer une alerte
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Logique pour supprimer une alerte
    // Dans une version complète, nous supprimerions de la base de données
    
    res.json({ message: `Alerte ${id} supprimée avec succès` });
  } catch (error) {
    console.error('Erreur lors de la suppression d\'une alerte:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
