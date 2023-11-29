const express = require('express')
const { registerDoctor, loginDoctor } = require('../controllers/doctorController')
const userRouter = require('./userRouter')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/multer')
const doctorRouter = express.Router()

doctorRouter.post('/register', upload.single('image'), registerDoctor)
doctorRouter.post('/login', loginDoctor)

userRouter.use(authentication)

module.exports = doctorRouter