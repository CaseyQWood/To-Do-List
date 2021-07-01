const axios = require('axios')
require('dotenv').config()
const removeSpecials = require('./helperfunction')

// tests from this file directly will fail as the .env file needs to be in the folder its being used
// this file is only for holding the functions

const findMovie = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
  const apiKey = process.env.OMDB_API_KEY;

  return axios({
    method: 'get',
    url: `http://www.omdbapi.com/?t=${searchString}&apikey=${apiKey}`,
    responseType: 'text'
  })
  .then((res) => {
    if (res.data.Error === 'Movie not found!') {
      return false
    }
    if (!removeSpecials(res.data.Title).toLowerCase().includes(removeSpecials(userInput).toLowerCase())) {
      return false
    }
    return res.data.Title

  })
  .catch((err) => {
    console.error(err);
  })

};

const findBook = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
  const apiKey = process.env.GOOGLE_BOOKS_KEY;

  return axios({
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=${apiKey}`,
    responseType: 'json'
  })
  .then((res) => {
    const bookTitle = res.data.items[2].volumeInfo.title

    if (!res.data.items) {
      return false
    }

    if (!bookTitle.toLowerCase().includes(userInput.toLowerCase())) {
      return false
    }
    
    return bookTitle;
  })
  .catch((err) => {
    console.error(err);
  })

};

const findRestaurant = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
  const apiKey = process.env.DOCUMENU_API_KEY;

  return axios({
    method: 'get',
    url: `https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${searchString}&key=${apiKey}`,
    responseType: 'json'
  })
  .then((res) => {

    if (!res.data.data[0]) {
      return false
    }
   
    if (!res.data.data[0].restaurant_name.toLowerCase().includes(userInput.toLowerCase())) {
      return false
    }

    return res.data.data[0].restaurant_name;

  })

};

module.exports = {
  findMovie,
  findBook,
  findRestaurant
};