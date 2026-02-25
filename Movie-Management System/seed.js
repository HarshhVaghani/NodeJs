require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const sampleMovies = [
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    releaseYear: 2010,
    rating: 8.8,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    duration: 148,
    language: 'English'
  },
  {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    releaseYear: 1994,
    rating: 9.3,
    genre: ['Drama', 'Crime'],
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    cast: 'Tim Robbins, Morgan Freeman',
    duration: 142,
    language: 'English'
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    releaseYear: 2014,
    rating: 8.6,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    duration: 169,
    language: 'English'
  },
  {
    title: 'Parasite',
    director: 'Bong Joon-ho',
    releaseYear: 2019,
    rating: 8.5,
    genre: ['Thriller', 'Drama', 'Comedy'],
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
    duration: 132,
    language: 'Korean'
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    releaseYear: 2008,
    rating: 9.0,
    genre: ['Action', 'Crime', 'Drama'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    duration: 152,
    language: 'English'
  },
  {
    title: 'Spirited Away',
    director: 'Hayao Miyazaki',
    releaseYear: 2001,
    rating: 8.6,
    genre: ['Animation', 'Adventure', 'Fantasy'],
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    cast: 'Daveigh Chase, Suzanne Pleshette',
    duration: 125,
    language: 'Japanese'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    console.log('✅ Sample movies seeded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
