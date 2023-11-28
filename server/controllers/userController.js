const { User } = require('../models')
const { handleServerError, handleClientError } = require("../helper/handleError")
const Joi = require('joi');
const { compare } = require('../helper/bycrpt');
const { generateToken } = require('../helper/jwt');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().required(),
          });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({status: 'Validation Failed', message: error.details[0].message,});
        }

        const existingPhone = await User.findOne({
            where: {
              phoneNumber: phoneNumber,
            },
        });

        if (existingPhone) {
            return handleClientError(res, 400, 'Phone number already exists');
        }

        const existingUser = await User.findOne({
            where: {
              email: email,
            },
        });
        if (existingUser) {
            return handleClientError(res, 400, 'Email has already exists');
        }

        const newUser = await User.create(
            {
                username,
                email,
                password,
                phoneNumber
            },
            {
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                },
            }
        )

        res.status(201).json({ data: newUser, message: 'User created successfully' });
    } catch (error) {
        return handleServerError(res);
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({status: 'Validation Failed', message: error.details[0].message,});
        }

        const user = await User.findOne({
            where: {
              email: email,
            },
        });

        const passwordMatch = compare(password, user.password)

        if (!passwordMatch) {
            return handleClientError(res, 401, 'Invalid password');
        }

        const token = generateToken(user.id, 'user')

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
        return  handleServerError(res)
    }
}