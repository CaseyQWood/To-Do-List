const express = require('express');
const router = express.Router();

module.exports = function(db) {
  router.post('/:id', (req, res) => {
    const id = req.params.id;
// console.log('req:', req)
console.log('req.params:', req.params)
    const sql = `DELETE FROM tasks WHERE id = '${id}';`;
    db.query(sql)
    .then(result =>{
      res.json({success : "Updated Successfully", status : 200});

    });


  })
  return router;
}
