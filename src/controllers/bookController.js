const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  const { title, author, genre, description } = req.body;

  const book = await Book.create({
    title,
    author,
    genre,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json(book);
};

exports.getAllBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  const offset = (page - 1) * limit;

  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip(offset)
    .limit(parseInt(limit));

  const totalBooks = await Book.countDocuments(filter);

  res.json({
    books,
    currentPage: parseInt(page),
    limit: parseInt(limit),
    totalBooks: totalBooks,
    totalPages: Math.ceil(totalBooks / limit),
  });
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
  if (!book) return res.status(404).json({ message: 'Book not found' });

  // Get paginated reviews
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  const reviews = await Review.find({ book: book._id })
    .populate('user', 'name')
    .skip(offset)
    .limit(parseInt(limit));

  const allReviews = await Review.find({ book: book._id });

  const avgRating =
    allReviews.reduce((acc, r) => acc + r.rating, 0) / (allReviews.length || 1);

  res.json({
    book,
    averageRating: avgRating.toFixed(1),
    reviews,
    totalReviews: allReviews.length,
    currentPage: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(allReviews.length / limit),
  });
};

// // GET /books?author=abc&genre=fiction&page=2&limit=10
// exports.getBooks = async (req, res) => {
//   const { page = 1, limit = 10, author, genre } = req.query;
//   const query = {};
//   if (author) query.author = new RegExp(author, 'i');
//   if (genre) query.genre = genre;

//   const books = await Book.find(query)
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit));
//   res.json(books);
// };

// // GET /search?query=harry
// exports.searchBooks = async (req, res) => {
//   const q = req.query.query;
//   const books = await Book.find({
//     $or: [
//       { title: { $regex: q, $options: 'i' } },
//       { author: { $regex: q, $options: 'i' } },
//     ],
//   });
//   res.json(books);
// };
