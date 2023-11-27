const { handleValidationError, handleInternalError } = require('../middleware/errorHandler')
const { Review, Doctor, User } = require('../models')
const joi = require('joi')

exports.addReview = async (req, res) => {
    try {
        const theReview = req.body
        const { doctorId } = req.params

        const schema = joi.object({
            comment: joi.string().required()
        })

        const { error } = schema.validate(theReview)

        if (error) {
            return handleValidationError(res, error)
        }

        const dataUser = await User.findByPk(1)

        if (!dataUser) {
            res.status(404).json({message: 'user not found'})
        }

        const dataDoctor = await Doctor.findOne({
            where: {
                id: doctorId
            }
        })

        if (!dataDoctor) {
            res.status(404).json({message: 'doctor not found'})
        }

        const result = await Review.create({
            userId: dataUser.id,
            doctorId: doctorId,
            comment: theReview.comment
        })

        console.log(theReview.comment);

        res.status(201).json({message: 'sukses', theReview})
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAllReviews = async (req, res) => {
    try {
        const dataReview = await Review.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Doctor
                }
            ]
        })
        res.status(200).json(dataReview)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}