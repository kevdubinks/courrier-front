import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx"; // Importez votre composant Login
 import DashboardClient from "./DashboardClient"; // Remplacez par votre composant de dashboard client
 import DashboardAdmin from "./DashboardAdmin"; // Remplacez par votre composant de dashboard gestionnaire

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client-dashboard" element={<DashboardClient />} />
        <Route path="/Admin-dashboard" element={<DashboardAdmin />} />
        {/* Ajoutez d'autres routes selon vos besoins */}
      </Routes>
    </Router>
  );
};

export default App;
