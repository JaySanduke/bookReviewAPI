const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');
const { reviewUpdateValidationRules } = require('../validators/reviewValidators');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// One review per user per book
// router.post('/books/:id/reviews', protect, createReview);

// Only the owner of the review can update/delete
router.put('/:id', protect, reviewUpdateValidationRules, validateRequest, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
