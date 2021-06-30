const express = require('express')
const router = express.Router();
require('dotenv').config()
const {findMovie, findBook, findRestaurant} = require('../api/api-search')
const {chooseCategory, checkForVerb, queryFunction} = require('./helperFunctions')


module.exports = (db) => {
  router.post("/", (req, res) => {
    const userInput = req.body.description
    const category = checkForVerb(userInput)
    let description = userInput;
    const queryFunction = (description, category) => {
      db.query(`
      INSERT INTO tasks (owner_id, description, category)
      VALUES (1, '${description}', '${category}')
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
    }
    
    if (category) { 

      queryFunction(userInput, category)

    } else {
      Promise.all([findMovie(userInput), findBook(userInput), findRestaurant(userInput)])
      .then((results) => {
  
        return [description, chooseCategory(results)]
  
      })
      .then((values) => {

        queryFunction(values[0], values[1])
  
      })
    }
  })
return router
}
