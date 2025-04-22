const axios = require('axios');

/**
 * Récupère les données météo actuelles pour une localisation donnée
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Object} - Données météo
 */
async function getCurrentWeather(lat, lon) {
  try {
    // En production, vous utiliseriez une API météo comme OpenWeatherMap
    // const apiKey = process.env.WEATHER_API_KEY;
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    // return response.data;
    
    // Pour le MVP, nous simulons des données
    return {
      location: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: "Localisation test"
      },
      current: {
        temp: 18.5,
        humidity: 85,
        weather: "Partiellement nuageux",
        rain: {
          "1h": 0.2
        },
        timestamp: new Date().toISOString()
      },
      history: {
        rainYesterday: 3.5,
        tempYesterday: 17.2
      }
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo actuelles:', error);
    throw error;
  }
}

/**
 * Récupère les prévisions météo pour une localisation donnée
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Object} - Prévisions météo
 */
async function getForecast(lat, lon) {
  try {
    // En production, vous utiliseriez une API météo
    // const apiKey = process.env.WEATHER_API_KEY;
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    // return response.data;
    
    // Pour le MVP, nous simulons des données
    return {
      location: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: "Localisation test"
      },
      forecast: [
        {
          timestamp: new Date(Date.now() + 3600 * 1000).toISOString(),
          temp: 19.0,
          humidity: 83,
          weather: "Nuageux",
          rain: {
            "3h": 0
          }
        },
        {
          timestamp: new Date(Date.now() + 7200 * 1000).toISOString(),
          temp: 19.2,
          humidity: 80,
          weather: "Éclaircies",
          rain: {
            "3h": 0
          }
        },
        {
          timestamp: new Date(Date.now() + 10800 * 1000).toISOString(),
          temp: 18.5,
          humidity: 78,
          weather: "Clair",
          rain: {
            "3h": 0
          }
        }
      ]
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des prévisions météo:', error);
    throw error;
  }
}

/**
 * Analyse les conditions météo pour déterminer si elles sont favorables aux escargots
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Object} - Analyse des conditions
 */
async function analyzeConditions(lat, lon) {
  try {
    // Récupérer les données météo actuelles et récentes
    const currentData = await getCurrentWeather(lat, lon);
    const forecastData = await getForecast(lat, lon);
    
    // Analyser les conditions pour les escargots
    // Conditions favorables:
    // 1. Humidité élevée (> 80%)
    // 2. Température douce (entre 15°C et 20°C)
    // 3. Pluie récente suivie de temps doux
    
    const humidity = currentData.current.humidity;
    const temperature = currentData.current.temp;
    const recentRain = currentData.history.rainYesterday > 0 || currentData.current.rain?.["1h"] > 0;
    
    // Calculer un score d'activité escargot (0-100)
    let escargotActivityScore = 0;
    
    // Facteur humidité (0-40 points)
    if (humidity >= 90) {
      escargotActivityScore += 40;
    } else if (humidity >= 80) {
      escargotActivityScore += 30;
    } else if (humidity >= 70) {
      escargotActivityScore += 20;
    } else if (humidity >= 60) {
      escargotActivityScore += 10;
    }
    
    // Facteur température (0-30 points)
    if (temperature >= 15 && temperature <= 20) {
      escargotActivityScore += 30; // Plage idéale
    } else if (temperature >= 12 && temperature <= 23) {
      escargotActivityScore += 15; // Plage acceptable
    }
    
    // Facteur pluie récente (0-30 points)
    if (recentRain) {
      escargotActivityScore += 30;
    }
    
    // Déterminer le niveau d'alerte
    let alertLevel = 'low';
    if (escargotActivityScore >= 80) {
      alertLevel = 'high';
    } else if (escargotActivityScore >= 50) {
      alertLevel = 'medium';
    }
    
    // Préparer un message adapté
    let message = '';
    if (alertLevel === 'high') {
      message = 'Conditions idéales pour les escargots ! La pluie récente et l\'humidité élevée favorisent leur sortie. Soyez très vigilants.';
    } else if (alertLevel === 'medium') {
      message = 'Conditions favorables aux escargots. La météo récente pourrait encourager leur activité. Soyez attentifs.';
    } else {
      message = 'Peu de chances de rencontrer des escargots. Les conditions ne sont pas optimales pour leur sortie.';
    }
    
    // Renvoyer l'analyse complète
    return {
      location: currentData.location,
      timestamp: new Date().toISOString(),
      currentConditions: {
        temperature,
        humidity,
        recentRain
      },
      analysis: {
        escargotActivityScore,
        alertLevel,
        message
      },
      forecast: {
        next24h: forecastData.forecast.map(item => ({
          timestamp: item.timestamp,
          conditions: item.weather,
          temp: item.temp,
          humidity: item.humidity
        }))
      }
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse des conditions:', error);
    throw error;
  }
}

module.exports = {
  getCurrentWeather,
  getForecast,
  analyzeConditions
};
