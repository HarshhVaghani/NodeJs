const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { isAdmin } = require('../middleware/auth');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Self-Help', 'Children', 'Other'];

// Dashboard
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const categoryStats = await Book.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);
    res.render('admin/dashboard', { totalBooks, categoryStats, recentBooks });
  } catch (err) {
    console.error(err);
    res.render('admin/dashboard', { totalBooks: 0, categoryStats: [], recentBooks: [] });
  }
});

// All Books
router.get('/books', isAdmin, async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }];
    if (category && category !== 'all') query.category = category;
    const books = await Book.find(query).sort({ createdAt: -1 });
    res.render('admin/books', { books, categories, search: search || '', selectedCategory: category || 'all' });
  } catch (err) {
    res.render('admin/books', { books: [], categories, search: '', selectedCategory: 'all' });
  }
});

// Add Book - Form
router.get('/books/add', isAdmin, (req, res) => {
  res.render('admin/add-book', { categories });
});

// Add Book - POST
router.post('/books', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, author, price, category, description, stock, isbn, publisher, publishedYear, rating } = req.body;
    const image = req.file ? req.file.filename : 'default-book.jpg';

    await Book.create({ title, author, price, category, description, stock, isbn, publisher, publishedYear, rating, image });
    req.flash('success', `"${title}" has been added successfully!`);
    res.redirect('/admin/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error adding book: ' + err.message);
    res.redirect('/admin/books/add');
  }
});

// Edit Book - Form
router.get('/books/:id/edit', isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) { req.flash('error', 'Book not found.'); return res.redirect('/admin/books'); }
    res.render('admin/edit-book', { book, categories });
  } catch (err) {
    req.flash('error', 'Book not found.');
    res.redirect('/admin/books');
  }
});

// Edit Book - PUT
router.put('/books/:id', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) { req.flash('error', 'Book not found.'); return res.redirect('/admin/books'); }

    const { title, author, price, category, description, stock, isbn, publisher, publishedYear, rating } = req.body;

    if (req.file) {
      // Delete old image if not default
      if (book.image && book.image !== 'default-book.jpg') {
        const oldPath = path.join(__dirname, '../public/uploads', book.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      book.image = req.file.filename;
    }

    book.title = title; book.author = author; book.price = price;
    book.category = category; book.description = description;
    book.stock = stock; book.isbn = isbn; book.publisher = publisher;
    book.publishedYear = publishedYear; book.rating = rating;

    await book.save();
    req.flash('success', `"${title}" updated successfully!`);
    res.redirect('/admin/books');
  } catch (err) {
    req.flash('error', 'Error updating book: ' + err.message);
    res.redirect(`/admin/books/${req.params.id}/edit`);
  }
});

// Delete Book
router.delete('/books/:id', isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) { req.flash('error', 'Book not found.'); return res.redirect('/admin/books'); }

    if (book.image && book.image !== 'default-book.jpg') {
      const imgPath = path.join(__dirname, '../public/uploads', book.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Book.findByIdAndDelete(req.params.id);
    req.flash('success', `"${book.title}" has been deleted.`);
    res.redirect('/admin/books');
  } catch (err) {
    req.flash('error', 'Error deleting book.');
    res.redirect('/admin/books');
  }
});

module.exports = router;
