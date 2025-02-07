import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthdate: '',
    gender: '',
    address: '',
    cin: '',
  });

  // Gérer les changements des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Soumettre les données du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Utilisateur ajouté avec succès!');
      } else {
        alert('Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur de connexion au serveur');
    }
  };

  return (
    <div>
      <h2>Formulaire Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Prénom:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date de naissance:
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Sexe:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
          </select>
        </label>
        <br />
        <label>
          Adresse:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          CIN:
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Ajouter l'utilisateur</button>
      </form>
    </div>
  );
};

export default UserForm;
