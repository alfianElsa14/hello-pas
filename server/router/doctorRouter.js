const express = require('express')
const { registerDoctor, loginDoctor } = require('../controllers/doctorController')
const userRouter = require('./userRouter')
const authentication = require('../middleware/authentication')
const doctorRouter = express.Router()

doctorRouter.post('/register', registerDoctor)
doctorRouter.post('/login', loginDoctor)

userRouter.use(authentication)

module.exports = doctorRouter