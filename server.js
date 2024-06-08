const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
PORT = process.env.PORT || 8000

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

