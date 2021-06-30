const express = require('express')
const router = express.Router();
require('dotenv').config()
const {findMovie, findBook, findRestaurant} = require('../api/api-search')
const {chooseCategory} = require('./helperFunctions')

module.exports = (db) => {
  router.post("/", (req, res) => {
    const userInput = req.body.description
    let category;
    let description = userInput;

    Promise.all([findMovie(userInput), findBook(userInput), findRestaurant(userInput)])
    .then((results) => {

      // if (userInput.toLowerCase().includes('to watch')) {
      //   category = 'Movie'
      // } else {
      //   category = chooseCategory(results)
      // }

      return [description, chooseCategory(results)]

    })
    .then((values) => {

      db.query(`
      INSERT INTO tasks (owner_id, description, category)
      VALUES (1, '${values[0]}', '${values[1]}')
      RETURNING *`
      )
      .then((result) => {
        res.json(result.rows)
        console.log(result.rows)
      })
      .catch((err) => {
        console.error(err)
        res
        .status(500)
        .json({error: err.message})
      })
    })
  })
 return router
};

async function asyncFunc() {
  const response = await axios.get("/some_url_endpoint");
  const data = await response.json();

  return data;
}


 