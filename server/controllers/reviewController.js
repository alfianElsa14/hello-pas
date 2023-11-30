const { handleValidationError, handleServerError } = require('../helper/handleError')
const { Review, Doctor, User } = require('../models')
const Joi = require('joi')

exports.addReview = async (req, res) => {
    try {
        const theReview = req.body
        const { doctorId } = req.params
        const userId = req.user.id

        const schema = Joi.object({
            comment: Joi.string().required()
        })

        const { error } = schema.validate(theReview)

        if (error) {
            return handleValidationError(res, error)
        }

        const dataUser = await User.findByPk(userId)

        if (!dataUser) {
            return res.status(404).json({ message: 'user not found' })
        }

        const dataDoctor = await Doctor.findOne({
            where: {
                id: doctorId
            }
        })

        if (!dataDoctor) {
            return res.status(404).json({ message: 'doctor not found' })
        }

        const result = await Review.create({
            userId: userId,
            doctorId: doctorId,
            comment: theReview.comment
        })

        res.status(201).json({ message: 'sukses', theReview })
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}

exports.getAllReviews = async (req, res) => {
    try {
        const { doctorId } = req.params
        const dataReview = await Review.findAll({
            where: {
                doctorId
            },
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
        return handleServerError(res)
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params
        const dataReview = await Review.findByPk(reviewId)

        if (!dataReview) {
            return res.status(404).json({ message: 'user not found' })
        }

        const result = await Review.destroy({
            where: {
                id: reviewId
            }
        })

        res.status(200).json({ message: "sukses delete", dataReview })
    } catch (error) {
        console.log(error);
        return handleServerError(res)
    }
}