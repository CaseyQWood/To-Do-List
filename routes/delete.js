const express = require('express');
const router = express.Router();

module.exports = function(db) {
  router.post('/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM tasks WHERE id = '${id}';`;
    db.query(sql)
    .then(result =>{
      console.log(result)
    });
    return router;

  })
}
