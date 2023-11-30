const express = require('express')
const { registerUser, loginUser, editUser, getAllUser, getProfileUser, verifyTokenUser, changePasswordUser } = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/multer')
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/allUsers', getAllUser)

userRouter.use(authentication)
userRouter.post('/verify-token', verifyTokenUser)
userRouter.get('/', getProfileUser)
userRouter.put('/changePassword', changePasswordUser)
userRouter.put('/editUser',upload.single('image'), editUser)


module.exports = userRouter