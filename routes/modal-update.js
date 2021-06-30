const express = require('express')
const router = express.Router();

module.exports = (db) => {
router.post('/:list_id', (req, res) => {
  const listId = req.params.list_id;
  const category = req.body.category
  const description = req.body.description
  const values = [category,description, listId]
  const query = `
  UPDATE tasks
  SET category = $1, description = $2
  Where id = $3
  RETURNING *;`;

  console.log(category)
  console.log(description)
  // console.log(description.split(' '))
  // const globalReplace = / /g;
  // const keyWords = description.replace(globalReplace, '')

  db.query(`
  UPDATE cortex
  SET ${category} = ${category} + 1
  WHERE search_value = '${description}'
  RETURNING *`)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
  console.error(err)
   return res.status(500).json({error: err.message})
  })



  db.query(query, values)
    .then((data) => {
      const updatedItem = data.rows
      return res.json(updatedItem)
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({error: err.message})
    })
})

return router;
}
