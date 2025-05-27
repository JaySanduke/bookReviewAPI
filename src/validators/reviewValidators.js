const { body } = require('express-validator');

exports.reviewCreateValidationRules = [
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
        .optional()
        .isString()
        .withMessage('Comment must be a string'),
];

exports.reviewUpdateValidationRules = [
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    body('comment')
        .optional()
        .isString()
        .withMessage('Comment must be a string'),
];
