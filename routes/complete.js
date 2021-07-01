const express = require('express')
const router = express.Router();

module.exports = (db) => {
  router.post('/:task_id', (req, res) => {
    const taskId = req.params.task_id;
    const checkForStateQuery = `SELECT completed FROM tasks WHERE id  = ${taskId}`;
    const setToFalseQuery = `UPDATE tasks
    SET completed = FALSE Where id = '${taskId}'
    RETURNING *;`;
    const setToTrueQuery = `UPDATE tasks
    SET completed = TRUE Where id = '${taskId}'
    RETURNING *;`;

    console.log(taskId)
    db.query(checkForStateQuery)
      .then((data) => {

        if (data.rows[0].completed) {
          db.query(setToFalseQuery)
          .then(data => {
            console.log(data.rows[0])
            return res.json(data.rows[0])
          })
        } else {
          db.query(setToTrueQuery)
          .then(data => {
            console.log(data.rows[0])
            return res.json(data.rows[0])
          })
        }
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
