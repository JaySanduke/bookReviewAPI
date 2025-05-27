const { body } = require('express-validator');

exports.bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').optional().isString().withMessage('Genre must be a string'),
  body('description').optional().isString(),
];
