# 📚 BookStore Management System

A full-stack book store management system built with Node.js, Express, EJS, MongoDB, and Tailwind CSS.

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Template Engine:** EJS
- **Database:** MongoDB (Mongoose)
- **Styling:** Tailwind CSS (CDN)
- **File Upload:** Multer

## 📁 Project Structure
```
bookstore/
├── app.js                  # Entry point
├── .env                    # Environment variables
├── package.json
├── models/
│   └── Book.js             # Book schema
├── routes/
│   ├── auth.js             # Login/logout
│   ├── user.js             # Public routes
│   └── admin.js            # Admin routes
├── middleware/
│   └── auth.js             # Admin auth guard
├── config/
│   └── multer.js           # Image upload config
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── admin-sidebar.ejs
│   ├── auth/
│   │   └── login.ejs
│   ├── user/
│   │   ├── index.ejs       # Book listing + search
│   │   └── book-detail.ejs # Book details
│   └── admin/
│       ├── dashboard.ejs
│       ├── books.ejs       # Manage books table
│       ├── add-book.ejs
│       └── edit-book.ejs
└── public/
    ├── images/
    └── uploads/            # Uploaded book covers
```

## ⚙️ Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Edit `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookstore
   SESSION_SECRET=your_secret_key
   PORT=3000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

3. **Start MongoDB**
   ```bash
   mongod
   ```

4. **Run the app**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 🔐 Admin Access
- URL: `http://localhost:3000/auth/login`
- Username: `admin`
- Password: `admin123`

## 📖 Features

### User Side
- Browse all books in a responsive grid
- Filter by category
- Search by title or author
- View detailed book information
- See related books

### Admin Side
- Secure login/logout
- Dashboard with stats & charts
- Add books with image upload
- Edit book details
- Delete books
- Filter & search books in admin table

## 🗄️ Book Schema
```js
{
  title: String,        // required
  author: String,       // required
  price: Number,        // required
  category: String,     // enum
  image: String,        // filename
  description: String,  // required
  stock: Number,
  isbn: String,
  publisher: String,
  publishedYear: Number,
  rating: Number (0-5)
}
```
