const express = require('express')
const router = express.Router();
require('dotenv').config()
const {findMovie, findBook, findRestaurant} = require('../api/api-search')



module.exports = () => {
  router.post("/", (req, res) => {
    // console.log(req)
    // const toDoItem = req.query.title
    // const promice1 = findMovie(toDoItem)
    // Promise.all([promice1])
    // .then(result => {
      res.json('test')
    // })
      // res.json('test')

    
  })
 return router
};