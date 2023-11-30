const express = require('express')
const { 
    registerDoctor, 
    loginDoctor, 
    getAllDoctor, 
    getDoctorById, 
    getProfileDoctor, 
    verifyTokenDoctor, 
    changePasswordDoctor 
} = require('../controllers/doctorController')
const userRouter = require('./userRouter')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/multer')
const doctorRouter = express.Router()

doctorRouter.post('/register', upload.single('image'), registerDoctor)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/allDoctors', getAllDoctor)
doctorRouter.get('/:doctorId', getDoctorById)

doctorRouter.use(authentication)
doctorRouter.post('/verify-token', verifyTokenDoctor)
doctorRouter.get('/', getProfileDoctor)
doctorRouter.put('/changePassword', changePasswordDoctor)

module.exports = doctorRouter