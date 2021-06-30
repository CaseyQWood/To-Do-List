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

  db.query(query, values)
    .then((data) => {
      const updatedItem = data.rows
      return res.json(updatedItem)
    })
    .catch((err) => {
      console.error(err)
      res
      .status(500)
      .json({error: err.message})
    })
})

return router;
}
