const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Home - Movie List
router.get('/', async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } },
        { cast: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre && genre !== 'all') {
      query.genre = genre;
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Fantasy', 'Adventure', 'Crime'];
    const featuredMovies = await Movie.find().sort({ rating: -1 }).limit(3);

    res.render('user/index', {
      movies,
      genres,
      featuredMovies,
      search: search || '',
      selectedGenre: genre || 'all',
      title: 'CineVault - Movie Management'
    });
  } catch (err) {
    console.error(err);
    res.render('user/index', { movies: [], genres: [], featuredMovies: [], search: '', selectedGenre: 'all', title: 'CineVault' });
  }
});

// Movie Detail
router.get('/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      req.flash('error_msg', 'Movie not found');
      return res.redirect('/');
    }
    const related = await Movie.find({ genre: movie.genre, _id: { $ne: movie._id } }).limit(4);
    res.render('user/detail', { movie, related, title: movie.title + ' - CineVault' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
