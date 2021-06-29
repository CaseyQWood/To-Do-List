const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const user = req.body;

    const sql = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
    const values = [user.username, user.password];
    db.query(sql, values)
      .then(result => {
        return result.rows[0];
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  return router;
}
