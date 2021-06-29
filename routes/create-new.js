const express = require('express')
const router = express.Router();
require('dotenv').config()
const {findMovie, findBook, findRestaurant} = require('../api/api-search')



module.exports = (db) => {
  router.post("/", (req, res) => {
  
    const toDoItem = req.body.description
    const moviePromise = findMovie(toDoItem);
    const bookPromise = findBook(toDoItem);
    const restaurantPromise = findRestaurant(toDoItem);
    let category;
    let description = toDoItem;

    Promise.all([moviePromise, bookPromise, restaurantPromise])
    .then((result) => {
      console.log(result)

      if (result[2]) {
        category = 'Restaurant'
        // return res.json('Movie')
      }
      else if (result[0]) {
        category = 'Movie'
        // return res.json('Book')
      }
      else if (result[1]){
        category = 'Book'
        // return res.json('Restaurant')
      } else {
        category = 'Product'
      }

      
      return [description, category]

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


 