const express = require('express')
const router = express.Router();
const task = require('../db/queries/task') 
// ^this^ would be requiring a query to the DB that we make 
//for what ever data we need for our .get requests


module.exports = (db) => {
  // this will get the user data from the DB to load up their specific list items
  router.get("/", (req, res) => {
    console.log(req.body)
    db.query(`SELECT * FROM tasks WHERE owner_id = 1;`)
      .then(data => {
        const list = data.rows;
        res.json({ list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

