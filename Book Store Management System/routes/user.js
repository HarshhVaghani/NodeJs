const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Home - View all books
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'all') {
      query.category = category;
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Self-Help', 'Children', 'Other'];
    res.render('user/index', { books, categories, search: search || '', selectedCategory: category || 'all' });
  } catch (err) {
    console.error(err);
    res.render('user/index', { books: [], categories: [], search: '', selectedCategory: 'all' });
  }
});

// View single book details
router.get('/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      req.flash('error', 'Book not found.');
      return res.redirect('/');
    }
    const related = await Book.find({ category: book.category, _id: { $ne: book._id } }).limit(4);
    res.render('user/book-detail', { book, related });
  } catch (err) {
    req.flash('error', 'Book not found.');
    res.redirect('/');
  }
});

module.exports = router;
