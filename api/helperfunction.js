const removeSpecials = (input) => {
  const colen = /:/g;
  const dash = /-/g
  
  let update = input.replace(colen, '')
  console.log(update)
  let update2 = update.replace(dash, ' ')
  console.log(update2)
  
  return update2
  console.log(res.data.Title.toLowerCase().replace(globalRemoveSpecials, ''))
    console.log(userInput.toLowerCase())
    console.log(res.data.Title.toLowerCase().replace(globalRemoveSpecials, '').includes(userInput.toLowerCase()))
}

module.exports = removeSpecials