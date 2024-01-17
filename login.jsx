import React, { useState, useEffect } from "react";
import { Autocomplete, Button, Pane, TextInput } from "evergreen-ui";
import { useNavigate } from 'react-router-dom';
import { FaUnlock, FaChevronDown } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entreprise, setEntreprise] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.firmNames)) {
        const formattedData = data.firmNames.map(firmName => ({
           // Ajustez cette ligne si nécessaire
        }));
        setEntreprise(formattedData);
      } else {
        console.log("La propriété 'firmNames' n'est pas un tableau:", data);
      }
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  }, []);

  const handleLogin = () => {
    if (!selectedCompany || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true);
    const requestBody = {
      username: username,
      password: password,
      firm_name: selectedCompany
    };

    fetch("http://51.83.69.229:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      if (data.success) {
        navigate('/dashboard'); // Modifier selon la route de votre dashboard
      } else {
        alert("Identifiants incorrects");
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.error("Erreur de connexion", error);
    });
  };

  return (
    <div className="login-page">
      <img src="./logo.png" alt="Logo" />
      <Autocomplete
        title="Entreprises"
        onChange={(changedItem) => setSelectedCompany(changedItem.value)}
        items={entreprise}
      >
        {({ getInputProps, getToggleButtonProps, getRef, inputValue, toggleMenu }) => (
          <Pane ref={getRef} display="flex">
            <TextInput
              placeholder="Entreprise"
              value={inputValue}
              {...getInputProps()}
            />
            <Button onClick={toggleMenu} {...getToggleButtonProps()}>
              <FaChevronDown />
            </Button>
          </Pane>
        )}
      </Autocomplete>
      <div className="login-password">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaUnlock />
      </div>
      <button onClick={handleLogin} disabled={!selectedCompany || !password || isLoading}>
        {isLoading ? "Connexion en cours..." : "Se connecter"}
</button>
</div>
);
};

export default Login;