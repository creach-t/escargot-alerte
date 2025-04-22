import React from 'react';
import { Link } from 'react-router-dom';

const InfoPage = () => {
  return (
    <div className="info-page">
      <div className="container">
        <h1>À propos des escargots</h1>
        
        <div className="info-section">
          <h2>Pourquoi protéger les escargots ?</h2>
          <div className="info-content">
            <div className="info-text">
              <p>
                Les escargots jouent un rôle écologique important dans nos écosystèmes. Ils participent
                à la décomposition des matières organiques et enrichissent les sols. De plus, ils sont un maillon
                essentiel de la chaîne alimentaire pour de nombreux animaux comme les oiseaux, les hérissons,
                et certains insectes.
              </p>
              <p>
                Malheureusement, ces petits gastéropodes sont souvent victimes de la circulation routière,
                particulièrement lors de leurs déplacements massifs après les pluies. C'est pour cette raison
                que nous avons créé Escargot'Alerte : pour aider à protéger ces créatures fragiles lorsqu'elles
                sont le plus vulnérables.
              </p>
            </div>
            <div className="info-image">
              🐌
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h2>Quand les escargots sont-ils actifs ?</h2>
          <div className="info-cards">
            <div className="card">
              <div className="card-header">
                <h3>Météo</h3>
              </div>
              <div className="card-body">
                <p>
                  Les escargots sont particulièrement actifs lorsque l'humidité est élevée, notamment après 
                  une pluie. Ils ont besoin de cette humidité pour faciliter leur déplacement. Leur bave,
                  ou mucus, est essentielle à leur locomotion et elle s'assèche rapidement en conditions sèches.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3>Température</h3>
              </div>
              <div className="card-body">
                <p>
                  La température idéale pour les escargots se situe entre 15°C et 20°C. En dessous de 5°C, 
                  ils ralentissent considérablement leur activité, et au-dessus de 25°C, ils risquent la 
                  déshydratation. C'est pourquoi on les voit souvent après une pluie suivie d'une période 
                  douce.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3>Moment de la journée</h3>
              </div>
              <div className="card-body">
                <p>
                  Les escargots sont principalement nocturnes ou crépusculaires. Ils préfèrent sortir 
                  le soir, la nuit ou tôt le matin pour éviter la chaleur et la déshydratation. En journée, 
                  ils se cachent généralement sous des pierres, des feuilles ou dans des recoins humides.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h2>Comment les aider ?</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Restez informé</h3>
              <p>
                Utilisez Escargot'Alerte pour être informé des périodes d'activité intense des escargots
                dans votre région. Les alertes sont générées en fonction des conditions météorologiques et
                des signalements des utilisateurs.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Soyez vigilant</h3>
              <p>
                Lors des déplacements nocturnes après une pluie, redoublez de vigilance sur les routes,
                particulièrement dans les zones boisées ou près des jardins. Ralentissez et soyez attentif
                à la présence d'escargots sur la chaussée.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Aidez-les à traverser</h3>
              <p>
                Si vous le pouvez en toute sécurité, aidez les escargots à traverser les routes. Déplacez-les
                délicatement dans le sens de leur déplacement, en les prenant par la coquille sans toucher
                leur corps mou qui est très fragile.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3>Signalez leur présence</h3>
              <p>
                Utilisez l'application pour signaler les zones où vous observez de nombreux escargots.
                Cela permettra d'alerter d'autres utilisateurs et de contribuer à la protection collective
                de ces petites créatures.
              </p>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h2>Faits intéressants sur les escargots</h2>
          <div className="facts-container">
            <div className="fact-card">
              <div className="fact-icon">🔍</div>
              <p>
                Un escargot peut avoir jusqu'à 14 000 dents disposées sur sa radula (langue râpeuse) qu'il utilise 
                pour déchiqueter sa nourriture.
              </p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">⏱️</div>
              <p>
                La vitesse moyenne d'un escargot est d'environ 0,05 km/h. À cette allure, il lui faudrait plus 
                de 8 jours pour parcourir 10 km sans interruption!
              </p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">💤</div>
              <p>
                En période de sécheresse ou de froid, les escargots peuvent entrer en hibernation ou en estivation 
                pendant plusieurs mois, se retirant dans leur coquille et sécrétant un mucus qui durcit pour former 
                un opercule protecteur.
              </p>
            </div>
            
            <div className="fact-card">
              <div className="fact-icon">📏</div>
              <p>
                La plus grande espèce d'escargot terrestre, l'achatine, peut atteindre jusqu'à 30 cm de long et 
                peser près de 1 kg!
              </p>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h2>À propos de l'application</h2>
          <div className="about-app">
            <p>
              Escargot'Alerte a été créée par une équipe passionnée de protection de la nature. Notre mission est
              de sensibiliser le public à la protection des escargots et de réduire leur mortalité sur les routes,
              particulièrement lors des périodes de forte activité liées aux conditions météorologiques.
            </p>
            <p>
              L'application utilise un algorithme d'analyse météorologique qui prend en compte l'humidité, la température, 
              les précipitations récentes et l'heure de la journée pour déterminer quand les escargots sont susceptibles 
              d'être actifs. Cet algorithme est constamment amélioré grâce aux signalements des utilisateurs.
            </p>
            <div className="app-buttons">
              <Link to="/" className="btn btn-primary">
                Retour à l'accueil
              </Link>
              <Link to="/map" className="btn btn-outline">
                Voir la carte des alertes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
