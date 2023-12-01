const { User } = require('../models')
const { handleServerError, handleClientError, handleNotFoundError, handleValidationError } = require("../helper/handleError")
const Joi = require('joi');
const { compare, hash } = require('../helper/bycrpt');
const { generateToken } = require('../helper/jwt');
const fs = require('fs');

exports.verifyTokenUser = async (req, res) => {
    try {
      return res.status(200).json({ status: 'Success' });
  
    } catch (error) {
      console.error(error);
      handleServerError(res);
    }
};

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
            attributes: { exclude: [ 'createdAt', 'updatedAt'] }
        });

        if(!user) {
            return handleClientError(res, 400, 'User not found')
        }

        const passwordMatch = compare(password, user.password)

        if (!passwordMatch) {
            return handleClientError(res, 401, 'Invalid password');
        }
        
        const formatedUser = user.toJSON()
        delete formatedUser.password;
        const token = generateToken(user.id, 'user')

        res.status(200).json({
            token: token,
            message: 'Login successful',
            data: formatedUser,
        });
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.editUser = async (req, res) => {
    try {
        const userId = req.user.id
        const newData = req.body

        const userData = await User.findByPk(userId)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        const oldImage = userData.image

        const schema = Joi.object({
            username: Joi.string(),
            email: Joi.string(),
            phoneNumber: Joi.string(),
            image: Joi.string()
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        const updatedImg = req.file ? req.file.path : userData.image;

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

        if (result[0] > 0) {
            if (req.file && oldImage) {
                try {
                    fs.unlinkSync(oldImage);
                } catch (unlinkError) {
                    console.error('Error deleting old image:', unlinkError);
                }
            }

            return res.status(200).json({ message: 'success', result });

        } else {

            return res.status(500).json({ message: 'Failed to update user' });

        }
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.getProfileUser = async (req, res) => {
    try {
        const userId = req.user.id
        const userData = await User.findByPk(userId, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        
        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        const formatedUser = userData.toJSON();
        formatedUser.role = 'user';
        res.status(200).json(formatedUser)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.changePasswordUser = async (req, res) => {
    try {
        const userId = req.user.id
        const { oldPassword, newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return handleNotFoundError(res, 'User');
        }

        const passwordMatch = compare(oldPassword, user.password);
        if (!passwordMatch) {
            return handleClientError(res, 401, 'Invalid old password');
        }

        user.password = hash(newPassword);
        await user.save();

        res.status(200).json({ message: 'Change password successfully' });
    } catch (error) {
        console.log(error)
        return handleServerError(res)
    }
}