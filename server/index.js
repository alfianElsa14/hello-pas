require("dotenv").config();
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3300
const router = require('./router/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/', router);
app.use('/public/assets', express.static('public/assets'))

app.all('*', (req, res) => {
  res.status(404).json({ message: 'API Not Found' })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
