const express = require('express')
const router = express.Router();

module.exports = (db) => {
router.post('/:list_id/update', (req, res) => {
  const listId = req.params.list_id;
  const category = req.query.category
  const values = [category, listId]
  const query = `
  UPDATE tasks 
  SET category = $1 
  Where id = $2;`;

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