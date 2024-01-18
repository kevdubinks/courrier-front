import React, { useState, useEffect } from 'react';

// Composant pour la liste des utilisateurs
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Remplacer par un appel API pour récupérer les utilisateurs
    fetch('http://51.83.69.229:3000/api/users/gestionEntreprise')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erreur lors du chargement des utilisateurs:', error));
  }, []);

  
  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}> {/* Assurez-vous que user.id est unique pour chaque utilisateur */}
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>
                {/* Boutons ou liens pour modifier/supprimer l'utilisateur */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// Composant principal pour le tableau de bord administrateur
const AdminDashboard = () => {
  return (
    <div>
      <h1>Tableau de Bord Administrateur</h1>
      <UserList />
      {/* Ici, vous pouvez ajouter d'autres composants tels que la gestion des notifications */}
    </div>
  );
};

export default AdminDashboard;
