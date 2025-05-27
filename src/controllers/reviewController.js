const Review = require('../models/Review');

exports.createReview = async (req, res, next) => {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    try {
        const review = await Review.create({
            rating,
            comment,
            user: req.user._id,
            book: bookId,
        });

        res.status(201).json(review);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You already reviewed this book.' });
        }
        // res.status(500).json({ message: err.message });
        next(err);
    }
};

exports.updateReview = async (req, res) => {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);
    console.log(review);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.user.equals(req.user._id)) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
};

exports.deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.user.equals(req.user._id)) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
};
