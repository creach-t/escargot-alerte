# 🐌 Escargot'Alerte 🐌

Un système d'alerte météo pour surveiller les conditions favorables à la sortie des escargots.

## Description

Escargot'Alerte est une application qui surveille les conditions météorologiques et envoie des notifications lorsque les conditions sont favorables à la sortie des escargots (après une averse suivie de temps doux). Le but est d'aider à protéger ces petites créatures sur les routes et chemins.

## Fonctionnalités

- **Analyse météorologique** : Surveille les conditions favorables aux escargots (humidité, température, précipitations)
- **Carte des alertes** : Visualisation géographique des zones à risque
- **Notifications** : Alertes en temps réel quand les conditions sont réunies
- **Signalements** : Possibilité pour les utilisateurs de signaler des concentrations d'escargots
- **Profil utilisateur** : Paramètres de notification et statistiques personnelles

## Structure du projet

- `/backend` : API Node.js
  - Express.js pour le serveur
  - Services météo et d'alerte
  - Routes API pour la météo, les alertes et les utilisateurs
- `/frontend` : Application React
  - Pages : Accueil, Carte, Alertes, Profil, Informations
  - Composants réutilisables
  - Intégration de cartes avec Leaflet

## Conditions favorables aux escargots

Les escargots sont particulièrement actifs quand :
- L'humidité est élevée (> 80%)
- La température est douce (entre 15°C et 20°C)
- Il y a eu des précipitations récentes
- C'est la nuit ou tôt le matin

## Installation

### Prérequis

- Node.js (v14+)
- npm ou yarn

### Backend

```bash
# Se placer dans le répertoire backend
cd backend

# Installer les dépendances
npm install

# Créer un fichier .env à partir du modèle
cp .env.example .env

# Démarrer le serveur en mode développement
npm run dev
```

### Frontend

```bash
# Se placer dans le répertoire frontend
cd frontend

# Installer les dépendances
npm install

# Démarrer l'application React
npm start
```

### Démarrer le projet complet

À la racine du projet, vous pouvez utiliser la commande suivante pour démarrer simultanément le backend et le frontend :

```bash
npm run install:all  # Installer toutes les dépendances
npm run dev          # Démarrer backend et frontend
```

## API Météo

Pour une version complète, vous devez obtenir une clé API pour un service météo comme OpenWeatherMap et l'ajouter à votre fichier `.env` dans le dossier backend.

## Développement

Ce projet est un MVP (Minimum Viable Product) qui peut être étendu avec les fonctionnalités suivantes :

- Authentification complète
- Intégration d'une API météo réelle
- Base de données pour stocker les alertes et les utilisateurs
- Notifications push via Firebase ou un service similaire
- Application mobile avec React Native

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT.
