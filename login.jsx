import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [firmName, setFirmName] = useState('');
  const [fourDigitCode, setFourDigitCode] = useState('');
  const [firms, setFirms] = useState([]);


 
  useEffect(() => {
    fetch('http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.firmNames)) {
          setFirms(data.firmNames);
        } else {
          console.error('La réponse n\'est pas un tableau:', data);
        }
      })
      .catch(error => console.error('Erreur lors du chargement des entreprises:', error));
  }, []);
  
  
  // http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://51.83.69.229:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firm_name: firmName, four_digit_code: fourDigitCode }),
      });
      const data = await response.json();
      if (response.ok) {
        // Stocker le token JWT et rediriger l'utilisateur
        localStorage.setItem('token', data.token, );
        localStorage.setItem('firmName', firmName); // Supposant que firmName est déjà disponible
        localStorage.setItem('isAdmin', data.isAdmin);
        // Rediriger vers le tableau de bord ou la page d'accueil
      } else {
        // Gérer les erreurs (utilisateur non trouvé, mot de passe incorrect, etc.)
        console.error(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  
  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de la Firme:
          <select value={firmName} onChange={(e) => setFirmName(e.target.value)}>
            <option value="">Sélectionnez une entreprise</option>
            {firms.map((firm, index) => (
              <option key={index} value={firm}>
                {firm}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Code à Quatre Chiffres:
          <input
            type="password"
            value={fourDigitCode}
            onChange={(e) => setFourDigitCode(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default LoginPage;
