const express = require('express')
const router = express.Router();

module.exports = (db) => {
// route for editing single list Item 
  router.get('/:list_id/edit', (req, res) => {
    console.log(req.params)
    db.query(`SELECT * FROM tasks WHERE id = $1`, [req.params.list_id])
    .then((data) => {
      const listItem = data.rows
      res.json({listItem})
    })
    .catch((err) => {
      console.error(err)
      res
      .status(500)
      .json({error: err.message})
    });
  });
  
  // router.post('/:list_id/update', (res, req) => {
  //   const values = req.params.list_id
  //   const query = `
  //   UPDATE tasks 
  //   SET category = $1 
  //   Where id = $2;`;

  //   console.log(values)
  //   db.query(query, values)
  //   .then((data) => {
  //     const updatedItem = data.rows
  //     res.json({updatedItem})
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //     res
  //     .status(500)
  //     .json({error: err.message})
  //   })
  //  })

return router;
}