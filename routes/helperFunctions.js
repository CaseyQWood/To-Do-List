
const chooseCategory = (apiResults) => {
  if (apiResults[2]) {
    return 'restaurants'
  }
  else if (apiResults[0]) {
    return 'films'
  }
  else if (apiResults[1]){
    return 'books'
  } else {
    return 'products'
  }
}

module.exports = {
  chooseCategory
}