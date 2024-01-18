import React, { useState, useEffect } from 'react';

// Composant pour la liste des utilisateurs
const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Remplacer par un appel API pour récupérer les utilisateurs
    fetch('http://51.83.69.229:3000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erreur lors du chargement des utilisateurs:', error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>État du Courrier</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.has_mail ? "En attente" : "Aucun courrier"}</td>
            <td>
              <button onClick={() => onEdit(user)}>Modifier</button>
              <button onClick={() => onDelete(user._id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Composant principal pour le tableau de bord administrateur
const AdminDashboard = () => {
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser(user);
    // Vous pouvez ouvrir un formulaire modal ici avec les informations de l'utilisateur
    const EditUserModal = ({ user, onSave, onClose }) => {
  const [editFormData, setEditFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    // Ajoutez d'autres champs si nécessaire
  });

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user._id, editFormData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Prénom:
            <input 
              name="first_name" 
              value={editFormData.first_name} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Nom:
            <input 
              name="last_name" 
              value={editFormData.last_name} 
              onChange={handleChange} 
            />
          </label>
          {/* Ajoutez d'autres champs de formulaire ici */}
          <button type="submit">Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );
};

  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      fetch(`http://51.83.69.229:3000/api/users/${userId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setUsers(users => users.filter(user => user._id !== userId));
          console.log('Utilisateur supprimé avec succès');
        } else {
          console.error('Erreur lors de la suppression de l\'utilisateur');
        }
      })
      .catch(error => {
        console.error('Erreur réseau:', error);
      });
    }
  };

  return (
    <div>
      <h1>Tableau de Bord Administrateur</h1>
      <UserList onEdit={handleEditUser} onDelete={handleDeleteUser} />
      {editingUser && (
        <EditUserForm user={editingUser} onSave={(updatedUser) => {
          // Logique pour enregistrer les modifications de l'utilisateur
        }} />
      )}
      {/* Ici, vous pouvez ajouter d'autres composants tels que la gestion des notifications */}
    </div>
  );
};

export default AdminDashboard;
