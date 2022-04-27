const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Review = require('../models/review')
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews')

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;