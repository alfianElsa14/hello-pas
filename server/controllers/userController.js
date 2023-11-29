const { User } = require('../models')
const { handleServerError, handleClientError, handleNotFoundError, handleValidationError } = require("../helper/handleError")
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
            return handleValidationError(res, error)
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
                phoneNumber,
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
        console.log(email)

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return handleValidationError(res, error)
        }

        const user = await User.findOne({
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
        console.log(error);
        return handleServerError(res)
    }
}

exports.editUser = async (req, res) => {
    try {
        const { userId } = req.params
        const newData = req.body
        const userData = await User.findByPk(userId)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().required(),
            phoneNumber: Joi.string().required()
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        const updatedImg = `http://localhost:3300/${req.file.path}`

        console.log(updatedImg, "<<<<");

        const result = await User.update({
            username: newData.username,
            email: newData.email,
            phoneNumber: newData.phoneNumber,
            image: updatedImg
        }, {
            where: {
                id: userId
            }
        })

        res.status(200).json({ message: 'success', result })
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const data = await User.findAll()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const {userId} = req.params
        const userData = await User.findByPk(userId)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        res.status(200).json(userData)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}