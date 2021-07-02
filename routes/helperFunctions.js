
const chooseCategory = (apiResults) => {
  if (apiResults[2]) {
    return 'restaurants'
  }
  else if (apiResults[0]) {
    return 'films'
  }
  else if (apiResults[1]){
    return 'books'
  } 
  else if (apiResults[3]) {
    return 'products'
  } else {
    return null
  }
}

const checkForVerb = (userInput) => {
  if (userInput.toLowerCase().includes('to watch')) {
    return 'films'
  } 
  else if (userInput.toLowerCase().includes('to read')) {
    return 'books'
  }
  else if (userInput.toLowerCase().includes('to eat')) {
    return 'restaurants'
  }
  else if (userInput.toLowerCase().includes('to buy')) {
    return 'products'
  } else {
    return undefined
  }
}

module.exports = {
  chooseCategory,
  checkForVerb, 
}