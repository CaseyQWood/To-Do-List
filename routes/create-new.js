const express = require('express')
const router = express.Router();
require('dotenv').config()
const {findMovie, findBook, findRestaurant, findProducts} = require('../api/api-search')
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
    };
    
    if (category) { 
   // this needs to be improved, currently it just removes the first characters ----
      queryFunction(userInput.substring(8), category)

    } else {
      Promise.all([findMovie(userInput), findBook(userInput), findRestaurant(userInput), findProducts(userInput, db)])
      .then(async (results) => {
        console.log(results)
        let conflicts = 0;
        // checks if multiple api's come back with a result 
        for (const result of results) {
          if(result) {
            conflicts += 1
          }
        }

        if (conflicts >= 2) {

          db.query(`
          SELECT books, films, restaurants, products FROM cortex 
          WHERE search_value LIKE '%${userInput.substring(1)}%'`)
          .then(data => {

            const memories = data.rows[0]
            let largestNumber = 0;
            let smartCategory;

            if (!memories) {
              return queryFunction(description, chooseCategory(results))
            }

            for ( const memory in memories) {
              if ( memories[memory] > largestNumber){
                largestNumber = memories[memory]
                smartCategory = memory
              } 
            }

            return queryFunction(description, smartCategory)
          })
        } else {
          return queryFunction(description, chooseCategory(results))
        }
      })
    }
  })
return router
};


  


 

