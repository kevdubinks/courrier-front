import { Autocomplete, Button, Pane, TextInput } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaUnlock } from "react-icons/fa6";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entreprise, setEntreprise] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const formattedData = data.map((entreprise) => ({
        label: entreprise.firm_name,
        value: entreprise._id,
      }));
      setEntreprise(formattedData);
    })
    .catch((error) => console.error(error));
  }, []);

  const handleLogin = () => {
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
      if (data.success) {
        setLoggedIn(true);
        // Redirection ou autres actions après la connexion réussie
      } else {
        alert("Identifiants incorrects");
      }
    })
    .catch((error) => {
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
              {...getInputProps()} // Propriétés d'entrée
            />
            <Button onClick={toggleMenu} {...getToggleButtonProps()}>
              <FaChevronDown /> // Bouton pour dérouler les options
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
      <button onClick={handleLogin} disabled={!selectedCompany || !password}>
        Se connecter
      </button>
    </div>
  );
};

export default Login;