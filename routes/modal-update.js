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
      return res.status(500).json({error: err.message})
    })

  
  db.query(`SELECT id FROM cortex WHERE search_value = '${description}'`)
  .then(data => {
    console.log('this is data', data)
    console.log(data.rows.length)
    if(data.rows.length === 0) {
      db.query(`
      INSERT INTO cortex (search_value, ${category}) VALUES ('${description}', 1)`)

    } else {

      db.query(`
      UPDATE cortex
      SET ${category} = ${category} + 1
      WHERE search_value = '${description}'
      RETURNING *`)
      .then((data) => {
        console.log('WILL THIS SHOW UP ?')
      })
      .catch((err) => {
      console.error(err)
       return res.status(500).json({error: err.message})
      })
    }
    
  })
  .catch(err => {console.error(err)})
  



  // I should be able to remove returning and the .then 
  db.query(`
  UPDATE cortex
  SET ${category} = ${category} + 1
  WHERE search_value = '${description}'
  RETURNING *`)
  .then((data) => {
  })
  .catch((err) => {
  console.error(err)
   return res.status(500).json({error: err.message})
  })
})

return router;
}
