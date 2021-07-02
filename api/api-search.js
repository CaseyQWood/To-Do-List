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
    // if (!res.data.Title.toLowerCase().includes(userInput.toLowerCase())) {
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
  const apiKey = process.env.YELP_API_KEY;
  
  console.log(process.env)
  return axios({
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?term=${searchString}&location=Vancouver`,
    responseType: 'json',
    headers : {
      Authorization: `Bearer ${apiKey}`
    }
  })
  .then((res) => {
    console.log(res.data.businesses[0])
    if (!res.data.businesses[0]) {
      return false
    }
   
    if (!res.data.businesses[0].name.toLowerCase().includes(userInput.toLowerCase())) {
      return false
    }

    return res.data.businesses[0].name;

  })

};


const findProducts = (userInput, db) => {
  // const userWords = userInput.split(' ')
  // let queryString = ''
  // for (const word of userWords) {
  //   queryString += word + 'AND name LIKE'
  // }
  const query =`SELECT name FROM products 
  WHERE name LIKE '%${userInput.toLowerCase().substring(1, userInput.length -1)}%'`

 return db.query(query)
  .then(data => {
    if (data.rows.length === 0) {
      return false
    }
    console.log('THIS IS THE DATA', data.rows)
    return data.rows
  })
}





module.exports = {
  findMovie,
  findBook,
  findRestaurant,
  findProducts
};


// THIS IS A BACKUP API SEARCH FOR FOOD (DOCUMENU) MUST KEEP IN CASE


// const findRestaurant = (userInput) => {
//   const globalReplace = / /g;
//   const searchString = userInput.replace(globalReplace, '+');
//   const apiKey = process.env.DOCUMENU_API_KEY;

//   return axios({
//     method: 'get',
//     url: `https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${searchString}&key=${apiKey}`,
//     responseType: 'json'
//   })
//   .then((res) => {

//     if (!res.data.data[0]) {
//       return false
//     }
   
//     if (!res.data.data[0].restaurant_name.toLowerCase().includes(userInput.toLowerCase())) {
//       return false
//     }

//     return res.data.data[0].restaurant_name;

//   })

// };