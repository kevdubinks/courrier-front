import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import DashboardClient from "./pages/DashboardClient";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProtectedRoute from './ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client-dashboard" element={
          <ProtectedRoute>
            <DashboardClient />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute isAdminRoute={true}>
            <DashboardAdmin />
          </ProtectedRoute>
        } />
        {/* Autres routes */}
      </Routes>
    </Router>
  );
};

export default App;
