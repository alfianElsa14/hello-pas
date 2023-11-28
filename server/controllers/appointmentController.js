const Joi = require("joi");
const { Op } = require("sequelize");

const { Appointment, User, Doctor } = require("../models");
const { handleServerError, handleClientError } = require("../helper/handleError");

exports.getAppointmentUser = async(req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.role !== 'admin' && (req.user.role === 'user' && req.user.id != userId))
      return handleClientError(res, 400, "Not Authorized");

    const foundUser = await User.findByPk(userId);
    if (!foundUser)
      return handleClientError(res, 404, "User Not Found");

    const appointments = await Appointment.findAll({
      where: {userId},  
      include: [
        { model: User, attributes: {exclude: ['password']} },
        { model: Doctor, attributes: {exclude: ['password']} },
      ]
    });
    
    return res.status(200).json({ data: appointments, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.getAvailableAppointment = async(req, res) => {
  
}

exports.getAppointmentDoctor = async(req, res) => {
  try {
    const { doctorId } = req.params;

    if (req.user.role !== 'admin' && (req.user.role === 'doctor' && req.user.id != doctorId))
      return handleClientError(res, 400, "Not Authorized");

    const foundDoctor = await Doctor.findByPk(doctorId);
    if (!foundDoctor)
      return handleClientError(res, 404, "Doctor Not Found");

    const appointments = await Appointment.findAll({
      where: {doctorId},
      include: [
        { model: User, attributes: {exclude: ['password']} },
        { model: Doctor, attributes: {exclude: ['password']} },
      ]
    });

    return res.status(200).json({ data: appointments, status: 'Success' });
  
  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.createAppointment = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = Joi.object({
      doctorId: Joi.number().required(),
      complaint: Joi.string().required(),
      startTime: Joi.date().iso().required().custom((value, helpers) => {
        // Get the current time
        const currentTime = new Date();
    
        // Calculate the minimum allowed start time (12 hours ahead)
        const minStartTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
    
        // Compare the provided startTime with the minimum allowed start time
        if (value < minStartTime) {
          return helpers.error('date.startTimeInvalid', { minStartTime });
        }
    
        return value;
      }),
      endTime: Joi.date().iso().required(),
    }).messages({
      'date.startTimeInvalid': '{{#label}} must be at least 12 hours ahead of the current time',
    });

    const { error } = scheme.validate(newData);
    if (error) 
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })

    const foundDoctor = await Doctor.findByPk(newData.doctorId);
    if (!foundDoctor)
      return handleClientError(res, 404, "Doctor Not Found");

    const existBlockedAppointment = await Appointment.findOne({ where: 
      {
        [Op.or]: [{
          userId: req.user.id,
          [Op.or]: [
            {
              startTime: {[Op.lte]: newData.startTime},
              endTime: {[Op.gt]: newData.startTime},
            },
            {
              startTime: {[Op.lte]: newData.endTime},
              endTime: {[Op.gt]: newData.endTime},
            }
          ]
        }, {
          doctorId: newData.doctorId,
          [Op.or]: [
            {
              startTime: {[Op.lte]: newData.startTime},
              endTime: {[Op.gt]: newData.startTime},
            },
            {
              startTime: {[Op.lte]: newData.endTime},
              endTime: {[Op.gt]: newData.endTime},
            }
          ]
        }]
      }
    });
    if (existBlockedAppointment) {
      if (req.user.id === existBlockedAppointment.userId)
        return handleClientError(res, 400, "There is a schedule conflic on user!")
      else
        return handleClientError(res, 400, "There is a schedule conflic on doctor!")
    } 

    const createdAppointment = await Appointment.create(newData);
    res.status(201).json({ data: createdAppointment, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.acceptAppointment = async(req, res) => {
  try {
    const { appointmentId } = req.params;
    const foundAppointment = await Appointment.findByPk(appointmentId, {include: [
      { model: User, attributes: {exclude: ['password']} },
      { model: Doctor, attributes: {exclude: ['password']} },
    ]});
    if (!foundAppointment)
      return handleClientError(res, 404, "Appointment Not Found");
    if (foundAppointment.status !== 'pending')
      return handleClientError(res, 400, `Appointment is in status: ${foundAppointment.status}`);

    console.log(foundAppointment.doctorId, "<< DOCTOR ID");
    console.log(req.user.id, "<< USER ID");

    if (foundAppointment.doctorId != req.user.id)
      return handleClientError(res, 400, "Not Authorized");

    foundAppointment.status = 'accepted';
    await foundAppointment.save();

    return res.status(200).json({ data: foundAppointment, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.payAppointment = async(req, res) => {
  try {
    // TODO: can only be done by appointment's user (not mytrans??)

    const { appointmentId } = req.params;
    const foundAppointment = await Appointment.findByPk(appointmentId, {include: [
      { model: User, attributes: {exclude: ['password']} },
      { model: Doctor, attributes: {exclude: ['password']} },
    ]});
    if (!foundAppointment)
      return handleClientError(res, 404, "Appointment Not Found");
    if (foundAppointment.status !== 'accepted')
      return handleClientError(res, 400, `Appointment is in status: ${foundAppointment.status}`);

    if (new Date() >= new Date(foundAppointment.startTime))
      return handleClientError(res, 400, "Appointment has passed");

    // TODO: Do the payment??

    foundAppointment.status = 'paid';
    await foundAppointment.save();

    return res.status(200).json({ data: foundAppointment, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.denyAppointment = async(req, res) => {
  try {
    const { appointmentId } = req.params;
    console.log(appointmentId, "<< APPOINTMENT ID");
    const foundAppointment = await Appointment.findByPk(appointmentId, {include: [
      { model: User },
      { model: Doctor },
    ]});
    if (!foundAppointment)
      return handleClientError(res, 404, "Appointment Not Found");

    if (foundAppointment.doctorId != req.user.id)
      return handleClientError(res, 400, "Not Authorized");

    await Appointment.destroy({where: {id: appointmentId}});
    // TODO: Send an email to appointment's user 

    return res.status(200).json({ 
      message: `Success delete appointmentId: ${appointmentId}`, status: 'Success' 
    });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}