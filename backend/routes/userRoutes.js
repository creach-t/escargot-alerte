const express = require('express');
const router = express.Router();

/**
 * @route POST /api/users/register
 * @description Enregistrement d'un nouvel utilisateur
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs requis ne sont pas fournis' });
    }
    
    // Dans une version complète, on vérifierait si l'email existe déjà
    // et on hashait le mot de passe
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      location,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création d\'un utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route POST /api/users/login
 * @description Connexion d'un utilisateur
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    // Simulation d'un utilisateur trouvé
    // Dans une version complète, on vérifierait dans la base de données
    const user = {
      id: '12345',
      name: 'Utilisateur Test',
      email: email
    };
    
    res.json({ 
      message: 'Connexion réussie',
      user
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route GET /api/users/profile
 * @description Récupération du profil utilisateur
 */
router.get('/profile', async (req, res) => {
  try {
    // En production, on utiliserait un middleware d'authentification
    // et on récupérerait l'ID utilisateur depuis le token
    
    // Simulation d'un profil utilisateur
    const userProfile = {
      id: '12345',
      name: 'Utilisateur Test',
      email: 'test@example.com',
      location: {
        lat: 48.856614,
        lon: 2.3522219
      },
      settings: {
        notificationsEnabled: true,
        alertRadius: 10 // km
      },
      stats: {
        alertsCreated: 5,
        escargotsSaved: 23
      }
    };
    
    res.json(userProfile);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @route PUT /api/users/settings
 * @description Mise à jour des paramètres utilisateur
 */
router.put('/settings', async (req, res) => {
  try {
    const { notificationsEnabled, alertRadius, location } = req.body;
    
    // En production, on utiliserait un middleware d'authentification
    // et on récupérerait l'ID utilisateur depuis le token
    
    // Simulation de mise à jour des paramètres
    const updatedSettings = {
      notificationsEnabled: notificationsEnabled !== undefined ? notificationsEnabled : true,
      alertRadius: alertRadius || 10,
      location: location || { lat: 48.856614, lon: 2.3522219 }
    };
    
    res.json({ 
      message: 'Paramètres mis à jour avec succès',
      settings: updatedSettings
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des paramètres:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
