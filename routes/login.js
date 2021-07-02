const express = require('express');
const router = express.Router();
let username;
let password;

module.exports = (db) => {
  router.post('/', (req, res) => {

    username = req.body.username;
    password = req.body.password;

    db.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then(result => {
        if (password === result.rows[0].password) {
          res.json(result.rows[0]);
        }
      })
      .catch(e => res.send(e));
  })
  return router;
}
