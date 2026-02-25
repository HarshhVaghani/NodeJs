# 🎬 CineVault - Movie Management System

A full-stack movie management system built with Node.js, Express, EJS, MongoDB, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or MongoDB Atlas)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (edit .env file)
# Set your MongoDB URI and customize credentials

# 3. Start the server
npm start

# For development with auto-restart
npm run dev
```

Then open: **http://localhost:3000**

---

## 🔐 Admin Access

- URL: `http://localhost:3000/admin/login`
- Default Username: `admin`
- Default Password: `admin123`

> ⚠️ Change these in the `.env` file before deploying!

---

## 📁 Project Structure

```
movie-management/
├── app.js                  # Main application entry
├── .env                    # Environment variables
├── package.json
├── config/
│   └── multer.js           # File upload config
├── middleware/
│   └── auth.js             # Admin authentication
├── models/
│   └── Movie.js            # Movie schema
├── routes/
│   ├── userRoutes.js       # Public routes
│   └── adminRoutes.js      # Admin routes
├── views/
│   ├── partials/           # Reusable components
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── user/
│   │   ├── index.ejs       # Home page / Movie list
│   │   └── detail.ejs      # Movie detail page
│   └── admin/
│       ├── login.ejs
│       ├── dashboard.ejs
│       ├── movies.ejs
│       ├── add-movie.ejs
│       └── edit-movie.ejs
└── public/
    └── uploads/            # Uploaded poster images
```

---

## ✨ Features

### User Module
- Browse all movies with poster grid
- Filter by genre
- Search by title, director, or cast
- View full movie details
- See related movies
- Featured/top-rated section

### Admin Module
- Secure login with session
- Dashboard with stats
- Add new movie with poster upload
- Edit existing movies
- Delete movies (auto-removes image file)
- Manage all movies in table view

## 🗄️ Database Schema

```js
Movie {
  title: String,
  director: String,
  releaseYear: Number,
  rating: Number (0-10),
  genre: Enum[12 genres],
  posterImage: String (filename),
  description: String,
  cast: String,
  language: String,
  duration: Number (minutes),
  createdAt: Date,
  updatedAt: Date
}
```
