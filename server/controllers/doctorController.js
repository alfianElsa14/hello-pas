const { Doctor, Review, User } = require('../models')
const { handleServerError, handleClientError, handleValidationError } = require("../helper/handleError")
const Joi = require('joi');
const { compare } = require('../helper/bycrpt');
const { generateToken } = require('../helper/jwt');

exports.verifyTokenDoctor = async (req, res) => {
    try {
      return res.status(200).json({ status: 'Success' });
  
    } catch (error) {
      console.error(error);
      handleServerError(res);
    }
};

exports.registerDoctor = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, yearExperience, practiceAt, price } = req.body;
        
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            yearExperience: Joi.number().required(),
            practiceAt: Joi.string().required(),
            price: Joi.number().required()
          });

        const { error } = schema.validate(req.body);
        if (error) {
            return handleValidationError(res, error)
        }

        const existingUser = await Doctor.findOne({
            where: {
              email: email,
            },
        });
        if (existingUser) {
            return handleClientError(res, 400, 'Email has already exists');
        }

        const existingPhone = await Doctor.findOne({
            where: {
              phoneNumber: phoneNumber,
            },
        });

        if (existingPhone) {
            return handleClientError(res, 400, 'Phone number already exists');
        }

        const uploadedImg = `http://localhost:3300/${req.file.path}`
        console.log(uploadedImg)

        const newDoctor = await Doctor.create(
            {
                username,
                email,
                password,
                phoneNumber,
                yearExperience,
                practiceAt,
                price,
                image: uploadedImg
            }
        );

        res.status(201).json({ data: newDoctor, message: 'Doctor created successfully' });
    } catch (error) {
        return handleServerError(res);
    }
}

exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body)
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return handleValidationError(res, error)
        }

        const user = await Doctor.findOne({
            where: {
              email: email,
            },
        });

        if(!user) {
            return handleClientError(res, 400, 'User not found')
        }

        const passwordMatch = compare(password, user.password)

        if (!passwordMatch) {
            return handleClientError(res, 401, 'Invalid password');
        }

        const token = generateToken(user.id, 'doctor')

        const dataResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }

        res.status(200).json({
            token: token,
            message: 'Login successful',
            data: dataResponse,
        });
    } catch (error) {
        console.log(error)
        return  handleServerError(res)
    }
}

exports.getAllDoctor = async (req, res) => {
    try {
        const data = await Doctor.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.getDoctorById = async (req, res) => {
    try {
        const {doctorId} = req.params;
        const doctorData = await Doctor.findByPk(doctorId, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        if (!doctorData) {
            return handleNotFoundError(res, 'Doctor');
        }

        res.status(200).json(doctorData)
    } catch (error) {
        return handleServerError(res)
    }
}

exports.getProfileDoctor = async (req, res) => {
    try {
        const doctorId = req.user.id
        const doctorData = await Doctor.findByPk(doctorId, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: Review,
                    attributes: ['comment'],
                        include: {
                            model: User,
                            attributes: ['username', 'image']
                        }
                }
            ]
        });

        if (!doctorData) {
            return handleNotFoundError(res, 'Doctor');
        }

        res.status(200).json(doctorData)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}