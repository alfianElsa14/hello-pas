const express = require('express')
const { addReview, getAllReviews, deleteReview } = require('../controllers/reviewController')
const reviewRouter = express.Router()

reviewRouter.post('/addReview/:doctorId', addReview)
reviewRouter.get('/getReviews/:doctorId', getAllReviews)
reviewRouter.delete('/deleteReview/:reviewId', deleteReview)

module.exports = reviewRouter