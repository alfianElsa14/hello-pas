const express = require('express')
const { getAppointmentUser, getAppointmentDoctor, createAppointment, acceptAppointment, payAppointment, denyAppointment } = require('../controllers/appointmentController')
const router = express.Router()

router.get("/user/:userId", getAppointmentUser);
router.get("/doctor/:doctorId", getAppointmentDoctor);
router.post("/", createAppointment);
router.put("/accept/:appointmentId", acceptAppointment);
router.put("/pay/:appointmentId", payAppointment);
router.delete("/:appointmentId", denyAppointment);

module.exports = router