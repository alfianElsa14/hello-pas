const Joi = require("joi");
const { Op } = require("sequelize");

const { Appointment, User, Doctor } = require("../models");
const { handleServerError, handleClientError } = require("../helper/handleError");

exports.getAppointmentUser = async(req, res) => {
  try {
    const { userId } = req.params;

    // TODO: Authorization (only user or admin can access)

    const foundUser = await User.findByPk(userId);
    if (!foundUser)
      return handleClientError(res, 404, "User Not Found");

    const appointments = await Appointment.findAll({
      where: {userId},  
      include: [
        { model: User },
        { model: Doctor },
      ]
    });
    
    return res.status(200).json({ data: appointments, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.getAppointmentDoctor = async(req, res) => {
  try {
    const { doctorId } = req.params;

    // TODO: Authorization (only user or admin can access)

    const foundDoctor = await Doctor.findByPk(doctorId);
    if (!foundDoctor)
      return handleClientError(res, 404, "Doctor Not Found");

    const appointments = await Appointment.findAll({
      where: {doctorId},
      include: [
        { model: User },
        { model: Doctor },
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
      userId: Joi.number().required(),        // TODO: read from token
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

    const foundUser = await User.findByPk(newData.userId);
    if (!foundUser)
      return handleClientError(res, 404, "User Not Found");

    const foundDoctor = await Doctor.findByPk(newData.doctorId);
    if (!foundDoctor)
      return handleClientError(res, 404, "Doctor Not Found");

    const existBlockedAppointment = await Appointment.findOne({ where: 
      {
        [Op.or]: [{
          userId: newData.userId,
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
      if (newData.userId === existBlockedAppointment.userId)
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
    // TODO: can only be accepted by appointment's doctor

    const { appointmentId } = req.params;
    const foundAppointment = await Appointment.findByPk(appointmentId, {include: [
      { model: User },
      { model: Doctor },
    ]});
    if (!foundAppointment)
      return handleClientError(res, 404, "Appointment Not Found");
    if (foundAppointment.status !== 'pending')
      return handleClientError(res, 400, `Appointment is in status: ${foundAppointment.status}`);

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
      { model: User },
      { model: Doctor },
    ]});
    if (!foundAppointment)
      return handleClientError(res, 404, "Appointment Not Found");
    if (foundAppointment.status !== 'accepted')
      return handleClientError(res, 400, `Appointment is in status: ${foundAppointment.status}`);

    // TODO : Check appointment is still at the future

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
    // TODO: can only be denied by appointment's doctor

    const { appointmentId } = req.params;
    const foundAppointment = await Appointment.findByPk(appointmentId, {include: [
      { model: User },
      { model: Doctor },
    ]});
    if (foundAppointment)
      return handleClientError(res, 404, "Appointment Not Found");

    await Appointment.destroy({where: {id: appointmentId}});
    // TODO: Send an email to appointment's user 

    return res.status(200).json({ 
      message: `Success delete appointmentId:${appointmentId}`, status: 'Success' 
    });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}