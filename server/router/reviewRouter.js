const express = require('express')
const { addReview, getAllReviews } = require('../controllers/reviewController')
const reviewRouter = express.Router()

reviewRouter.post('/addReview/:doctorId', addReview)
reviewRouter.get('/getReviews', getAllReviews)

module.exports = reviewRouter