const express = require('express')
const { registerUser, loginUser, editUser, getAllUser, getProfileUser, verifyTokenUser } = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/multer')
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/allUsers', getAllUser)

userRouter.use(authentication)
userRouter.post('/verify-token', verifyTokenUser)
userRouter.put('/editUser/:userId',upload.single('image'), editUser)
userRouter.get('/', getProfileUser)


module.exports = userRouter