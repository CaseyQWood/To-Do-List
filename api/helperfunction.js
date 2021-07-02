const removeSpecials = (input) => {
  const colen = /:/g;
  const dash = /-/g
  
  let update = input.replace(colen, '')
  let update2 = update.replace(dash, ' ')

  return update2
}

module.exports = removeSpecials