const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required'],
    min: 1888,
    max: new Date().getFullYear() + 5
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 0,
    max: 10
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Fantasy', 'Adventure', 'Crime']
  },
  posterImage: {
    type: String,
    default: 'default-poster.jpg'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  cast: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    default: 'English'
  },
  duration: {
    type: Number // in minutes
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
