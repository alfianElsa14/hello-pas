const { Doctor, Review, User } = require('../models')
const { handleServerError, handleClientError, handleValidationError, handleNotFoundError } = require("../helper/handleError")
const Joi = require('joi');
const { compare, hash } = require('../helper/bycrpt');
const { generateToken } = require('../helper/jwt');
const fs = require('fs');


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
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!user) {
            return handleClientError(res, 400, 'User not found')
        }

        const passwordMatch = compare(password, user.password)

        if (!passwordMatch) {
            return handleClientError(res, 401, 'Invalid password');
        }

        const formatedUser = user.toJSON()
        delete formatedUser.password;
        const token = generateToken(user.id, 'doctor')

        res.status(200).json({
            token: token,
            message: 'Login successful',
            data: formatedUser,
        });
    } catch (error) {
        console.log(error)
        return handleServerError(res)
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
        const { doctorId } = req.params;
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

        const formatedDoctor = doctorData.toJSON();
        formatedDoctor.role = 'doctor';

        res.status(200).json(formatedDoctor)
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.editDoctor = async (req, res) => {
    try {
        const doctorId = req.user.id
        const newData = req.body
        const doctorData = await Doctor.findByPk(doctorId)

        if (!doctorData) {
            return handleNotFoundError(res, 'Doctor');
        }

        const oldImage = doctorData.image

        const schema = Joi.object({
            username: Joi.string(),
            email: Joi.string(),
            phoneNumber: Joi.string(),
            image: Joi.string(),
            practiceAt: Joi.string(),
            price: Joi.number()
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        const updatedImg = req.file ? req.file.path : userData.image;

        const result = await Doctor.update({
            username: newData.username,
            email: newData.email,
            phoneNumber: newData.phoneNumber,
            image: updatedImg,
            practiceAt: newData.practiceAt,
            price: newData.price,
        }, {
            where: {
                id: doctorId
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

exports.changePasswordDoctor = async (req, res) => {
    try {
        const doctorId = req.user.id
        const { oldPassword, newPassword } = req.body;

        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return handleNotFoundError(res, 'Doctor');
        }

        const passwordMatch = compare(oldPassword, doctor.password);
        if (!passwordMatch) {
            return handleClientError(res, 401, 'Invalid old password');
        }

        doctor.password = hash(newPassword);
        await doctor.save();

        res.status(200).json({ message: 'Change password successfully' });
    } catch (error) {
        return handleServerError(res)
    }
}