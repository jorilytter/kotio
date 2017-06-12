const express = require('express')
const bodyParser = require('body-parser')
const Promise = require('bluebird')
const ruuvitag = require('./ruuvitag/sensors')
const tellstickSensors = require('./tellstick/sensors')
const tellstickSwitches = require('./tellstick/switches')
const port = 3101

const app = express()
app.use(bodyParser.json())
app.listen(port)

console.log(`express server running on ${port}`)

ruuvitag.start()

app.get('/ruuvitag', function(req, res) {
  res.json(ruuvitag.data())
})

app.get('/tellstick/sensors', function(req, res) {
  tellstickSensors.sensors(sensors => res.json(sensors))
})

app.get('/tellstick/switches', function(req, res) {
  tellstickSwitches.list()
    .then(response => res.json(response))
    .catch(e => res.status(500).json(e))
})

app.post('/tellstick/on', function(req, res) {
  tellstickSwitches.turnOn(req.body)
    .then(response => res.json(response))
    .catch(e => res.status(500).json(e))
})

app.post('/tellstick/off', function(req, res) {
  tellstickSwitches.turnOff(req.body)
    .then(response => res.json(response))
    .catch(e => res.status(500).json(e))
})
