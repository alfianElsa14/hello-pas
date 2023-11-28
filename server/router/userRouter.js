const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.use(authentication)

module.exports = userRouter