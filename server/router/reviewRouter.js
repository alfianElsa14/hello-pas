const express = require('express')
const { addReview, getAllReviews, deleteReview } = require('../controllers/reviewController')
const authentication = require('../middleware/authentication')
const reviewRouter = express.Router()

reviewRouter.use(authentication)
reviewRouter.post('/addReview/:doctorId', addReview)
reviewRouter.get('/getReviews/:doctorId', getAllReviews)
reviewRouter.delete('/deleteReview/:reviewId', deleteReview)

module.exports = reviewRouter