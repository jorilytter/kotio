const express = require('express')
const ruuvitag = require('./ruuvitag/sensors')
const port = 3101

const app = express()
app.listen(port)

console.log(`express server running on ${port}`)

ruuvitag.start()

app.get('/', function(req, res) {
  res.json(ruuvitag.data())
})
