const express = require('express');
const {
    createBook,
    getAllBooks,
    getBookById,
} = require('../controllers/bookController');
const { createReview } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { bookValidationRules } = require('../validators/bookValidators');
const { reviewCreateValidationRules } = require('../validators/reviewValidators');


const router = express.Router();

router.post('/', protect, bookValidationRules, validateRequest, createBook);          // Add new book (Auth)
router.get('/', getAllBooks);                   // Get all books (filters + pagination)
router.get('/:id', getBookById);                // Get book by ID + reviews

// One review per user per book
router.post('/:id/reviews', protect, reviewCreateValidationRules, validateRequest, createReview);

module.exports = router;
