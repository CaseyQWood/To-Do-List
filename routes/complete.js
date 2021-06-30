const express = require('express')
const router = express.Router();

module.exports = (db) => {
  router.post('/:task_id', (req, res) => {
    const taskId = req.params.task_id;
    const query = `
    UPDATE tasks
    SET completed = TRUE Where id = '${taskId}'
    RETURNING *;`;

    db.query(query)
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
