const { Doctor } = require('../models')
const { handleServerError, handleClientError } = require("../helper/handleError")
const Joi = require('joi');
const { compare } = require('../helper/bycrpt');
const { generateToken } = require('../helper/jwt');

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
            return res.status(400).json({status: 'Validation Failed', message: error.details[0].message,});
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

        const newDoctor = await Doctor.create(
            {
                username,
                email,
                password,
                phoneNumber,
                yearExperience,
                practiceAt,
                price
            },
            {
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                },
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
            return res.status(400).json({status: 'Validation Failed', message: error.details[0].message,});
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