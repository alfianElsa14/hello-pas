const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3300
const router = require('./router/index')

dotenv
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/', router);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'API Not Found' })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
