import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    cin: '',
    address: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulaire soumis !');
  };

  return (
    <div>
      <h1>Formulaire Utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange}/>
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sexe :</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <option value="">Sélectionner...</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div>
          <label>CIN :</label>
          <input
            type="text"
            name="cin"
            value={user.cin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Adresse :</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date de naissance :</label>
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter Utilisateur</button>
      </form>
    </div>
  );
}

export default App;
