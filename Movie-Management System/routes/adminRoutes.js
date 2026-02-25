const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { isAdmin } = require('../middleware/auth');
const upload = require('../config/multer');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Admin Login Page
router.get('/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin/dashboard');
  res.render('admin/login', { title: 'Admin Login - CineVault' });
});

// Admin Login POST
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    req.flash('success_msg', 'Welcome back, Admin!');
    res.redirect('/admin/dashboard');
  } else {
    req.flash('error_msg', 'Invalid credentials');
    res.redirect('/admin/login');
  }
});

// Admin Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin Dashboard
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const genres = await Movie.distinct('genre');
    const recentMovies = await Movie.find().sort({ createdAt: -1 }).limit(5);
    const topRated = await Movie.find().sort({ rating: -1 }).limit(5);
    const avgRating = await Movie.aggregate([{ $group: { _id: null, avg: { $avg: '$rating' } } }]);

    res.render('admin/dashboard', {
      title: 'Admin Dashboard - CineVault',
      totalMovies,
      totalGenres: genres.length,
      recentMovies,
      topRated,
      avgRating: avgRating[0]?.avg?.toFixed(1) || 0
    });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/login');
  }
});

// Movie List for Admin
router.get('/movies', isAdmin, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } }
      ];
    }
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.render('admin/movies', { title: 'Manage Movies - CineVault', movies, search: search || '' });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/dashboard');
  }
});

// Add Movie - GET
router.get('/movies/add', isAdmin, (req, res) => {
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Fantasy', 'Adventure', 'Crime'];
  res.render('admin/add-movie', { title: 'Add Movie - CineVault', genres });
});

// Add Movie - POST
router.post('/movies/add', isAdmin, upload.single('posterImage'), async (req, res) => {
  try {
    const { title, director, releaseYear, rating, genre, description, cast, language, duration } = req.body;
    const movie = new Movie({
      title, director, releaseYear, rating, genre, description, cast, language, duration,
      posterImage: req.file ? req.file.filename : 'default-poster.jpg'
    });
    await movie.save();
    req.flash('success_msg', `"${title}" added successfully!`);
    res.redirect('/admin/movies');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error adding movie: ' + err.message);
    res.redirect('/admin/movies/add');
  }
});

// Edit Movie - GET
router.get('/movies/edit/:id', isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      req.flash('error_msg', 'Movie not found');
      return res.redirect('/admin/movies');
    }
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Fantasy', 'Adventure', 'Crime'];
    res.render('admin/edit-movie', { title: 'Edit Movie - CineVault', movie, genres });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/movies');
  }
});

// Edit Movie - PUT
router.put('/movies/edit/:id', isAdmin, upload.single('posterImage'), async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      req.flash('error_msg', 'Movie not found');
      return res.redirect('/admin/movies');
    }

    const { title, director, releaseYear, rating, genre, description, cast, language, duration } = req.body;
    
    if (req.file) {
      // Delete old poster if not default
      if (movie.posterImage !== 'default-poster.jpg') {
        const oldPath = path.join(__dirname, '../public/uploads/', movie.posterImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      movie.posterImage = req.file.filename;
    }

    movie.title = title;
    movie.director = director;
    movie.releaseYear = releaseYear;
    movie.rating = rating;
    movie.genre = genre;
    movie.description = description;
    movie.cast = cast;
    movie.language = language;
    movie.duration = duration;

    await movie.save();
    req.flash('success_msg', `"${title}" updated successfully!`);
    res.redirect('/admin/movies');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating movie: ' + err.message);
    res.redirect(`/admin/movies/edit/${req.params.id}`);
  }
});

// Delete Movie
router.delete('/movies/delete/:id', isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      req.flash('error_msg', 'Movie not found');
      return res.redirect('/admin/movies');
    }

    // Delete poster file
    if (movie.posterImage !== 'default-poster.jpg') {
      const posterPath = path.join(__dirname, '../public/uploads/', movie.posterImage);
      if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
    }

    await Movie.findByIdAndDelete(req.params.id);
    req.flash('success_msg', `"${movie.title}" deleted successfully!`);
    res.redirect('/admin/movies');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error deleting movie');
    res.redirect('/admin/movies');
  }
});

module.exports = router;
