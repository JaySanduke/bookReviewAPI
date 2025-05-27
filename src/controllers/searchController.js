const Book = require('../models/Book');

exports.searchBooks = async (req, res) => {
    const { query } = req.query;

    if (!query) return res.status(400).json({ message: 'Search query is required' });

    const regex = new RegExp(query, 'i'); // case-insensitive
    const books = await Book.find({
        $or: [{ title: regex }, { author: regex }],
    });

    res.json(books);
};
