const express = require('express')
const router = express.Router();
require('dotenv').config()
const {findMovie, findBook, findRestaurant} = require('../api/api-search')



module.exports = () => {
  router.post("/", (req, res) => {
  
    const toDoItem = req.body.description
    const moviePromise = findMovie(toDoItem)
    const bookPromise = findBook(toDoItem)
    const restaurantPromise = findRestaurant(toDoItem)
    Promise.all([moviePromise, bookPromise, restaurantPromise])
    .then((result) => {
      if (result[0]) {
        return res.json('Movie')
      }
      else if (result[1]) {
        return res.json('Book')
      }
      else if (result[2]){
        return res.json('Restaurant')
      }
      return res.json('Product')
    })
  })
 return router
};

async function asyncFunc() {
  const response = await axios.get("/some_url_endpoint");
  const data = await response.json();

  return data;
}


 