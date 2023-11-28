const express = require('express')
const { registerUser, loginUser, editUser, getAllUser, getUserById } = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/multer')
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/allUsers', getAllUser)
userRouter.get('/:userId', getUserById)

userRouter.use(authentication)
userRouter.put('/editUser/:userId',upload.single('image'), editUser)


module.exports = userRouter