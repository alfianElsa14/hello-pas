const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const doctorRouter = require('./doctorRouter')
const appointmentRouter = require('./appointmentRouter')
const reviewRouter = require('./reviewRouter')

router.use('/users', userRouter)
router.use('/doctors', doctorRouter)
router.use('/appointments', appointmentRouter)
router.use('/reviews', reviewRouter)

module.exports = router