const axios = require('axios')
require('dotenv').config()

// tests from this file directly will fail as the .env file needs to be in the folder its being used
// this file is only for holding the functions

const findMovie = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
  const apiKey = process.env.OMDB_API_KEY;
  
  axios({
    method: 'get',
    url: `http://www.omdbapi.com/?t=${searchString}&apikey=${apiKey}`,
    responseType: 'text'
  })
  .then((res) => {
    if(res.data) {console.log(res.data.Title)}
    
  })
  .catch((err) => {
    console.error(err);
  })
};


const findBook = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
  const apiKey = process.env.GOOGLE_BOOKS_KEY;

  axios({
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=${apiKey}`,
    responseType: 'json'
  })
  .then((res) => {
    console.log(res.data.items[2].volumeInfo.title)    
  })
  .catch((err) => {
    console.error(err);
  })
};

const findRestaurant = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
  const apiKey = process.env.DOCUMENU_API_KEY;


  axios({
    method: 'get',
    url: `https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${searchString}&key=${apiKey}`,
    responseType: 'json'
  })
  .then((res) => {
    console.log(res.data.data[0].restaurant_name)
  })
}


module.exports = {
  findMovie,
  findBook,
  findRestaurant
};