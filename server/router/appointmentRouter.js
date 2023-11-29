const express = require('express')
const { getAppointmentUser, getAppointmentDoctor, createAppointment, acceptAppointment, payAppointment, denyAppointment, getAvailableAppointments, midtransPayment } = require('../controllers/appointmentController');
const authentication = require('../middleware/authentication');
const { authorize } = require('../middleware/authorize');
const router = express.Router()

router.use(authentication);
router.get("/user/:userId", authorize(['admin', 'user']), getAppointmentUser);
router.get("/doctor/:doctorId", authorize(['admin', 'doctor']), getAppointmentDoctor);
router.get("/available/:doctorId", authorize(['user']), getAvailableAppointments);
router.post("/", authorize(['user']), createAppointment);
router.put("/accept/:appointmentId", authorize(['doctor']), acceptAppointment);
router.put("/pay/:appointmentId", payAppointment);
router.post('/midtransToken/:appointmentId', midtransPayment)
router.delete("/:appointmentId", authorize(['doctor']), denyAppointment);

module.exports = router