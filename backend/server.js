const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;
const cors = require('cors');  


app.use(cors());
// Middleware pour parser les requêtes JSON
app.use(express.json());

// Créer la base de données SQLite (si elle n'existe pas)
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Créer une table "users" si elle n'existe pas déjà
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    gender TEXT NOT NULL,
    address TEXT NOT NULL,
    cin TEXT NOT NULL
  );`
);

// Route pour obtenir tous les utilisateurs
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route pour ajouter un utilisateur
app.post('/users', (req, res) => {
    const { name, surname, birthdate, gender, address, cin } = req.body;
    
    db.run(
      `INSERT INTO users (name, surname, birthdate, gender, address, cin) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, surname, birthdate, gender, address, cin],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        // Renvoie l'ID généré et toutes les informations de l'utilisateur
        res.status(201).json({
          id: this.lastID, 
          name,
          surname,
          birthdate,
          gender,
          address,
          cin
        });
      }
    );
  });
  

// Route pour mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, surname, birthdate, gender, address, cin } = req.body;

  db.run(
    `UPDATE users SET name = ?, surname = ?, birthdate = ?, gender = ?, address = ?, cin = ? WHERE id = ?`,
    [name, surname, birthdate, gender, address, cin, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
});

// Route pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM users WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    }
  );
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
