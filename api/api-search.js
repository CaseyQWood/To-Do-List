const axios = require('axios')


const findMovie = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
// YOU NEED THE API KEY FROM THE .ENV FILE FOR THIS TO WORK JUST ADD IT TO THE END OF THE URL
  axios({
    method: 'get',
    url: `http://www.omdbapi.com/?t=${searchString}&apikey=`,
    responseType: 'text'
  })
  .then((res) => {
    if(res.data) {console.log(res.data.Title) }
    
  })
  .catch((err) => {
    console.error(err);
  })
};
// this is just for testing
// findMovie('the grand Budapest Hotel')

const findBook = (userInput) => {
  const globalReplace = / /g;
  const searchString = userInput.replace(globalReplace, '+');
// YOU NEED THE API KEY FROM THE .ENV FILE FOR THIS TO WORK JUST ADD IT TO THE END OF THE URL
  axios({
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=`,
    responseType: 'json'
  })
  .then((res) => {
    console.log(res.data.items[2].volumeInfo.title)    
  })
  .catch((err) => {
    console.error(err);
  })
};

findBook('harry potter')

module.exports = {
  findMovie
};