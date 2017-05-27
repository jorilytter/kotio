const express = require('express')
const port = 3101

const app = express()
app.listen(port)

console.log(`express server running on ${port}`)
