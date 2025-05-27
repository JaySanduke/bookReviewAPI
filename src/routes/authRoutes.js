const express = require('express');
const { signup, login } = require('../controllers/authController');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/signup',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    validateRequest,
    signup);

router.post('/login',
    [
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    login);

module.exports = router;
