import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [user, setUser] = useState(null);

  // Get session ID from localStorage
  const getSessionId = () => localStorage.getItem('sessionId');

  // Get blogs from server on page load
  useEffect(() => {
    checkAuth();
    loadBlogs();
  }, []);

  // Check authentication status
  const checkAuth = async () => {
    const sessionId = getSessionId();
    if (sessionId) {
      try {
        const response = await fetch('/api/me', {
          headers: { 'x-session-id': sessionId }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem('sessionId');
        }
      } catch (err) {
        localStorage.removeItem('sessionId');
      }
    }
    setLoading(false);
  };

  // Load all blogs
  const loadBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.log('Error loading blogs');
      setLoading(false);
    }
  };

  // Handle authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    const endpoint = authMode === 'register' ? '/api/register' : '/api/login';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('sessionId', data.sessionId);
        setUser(data.user);
        setShowAuthModal(false);
        setAuthData({ username: '', password: '' });
      } else {
        setAuthError(data.message);
      }
    } catch (err) {
      setAuthError('Something went wrong. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const sessionId = getSessionId();
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'x-session-id': sessionId }
      });
    } catch (err) {
      console.log('Error logging out');
    }
    localStorage.removeItem('sessionId');
    setUser(null);
  };

  // Open auth modal
  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthError('');
    setAuthData({ username: '', password: '' });
    setShowAuthModal(true);
  };

  // Create new blog
  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-session-id': getSessionId()
        },
        body: JSON.stringify(formData)
      });
      if (response.status === 401) {
        alert('Please login to create a blog');
        return;
      }
      const newBlog = await response.json();
      setBlogs([newBlog, ...blogs]);
      closeForm();
    } catch (err) {
      console.log('Error creating blog');
    }
  };

  // Update existing blog
  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blogs/${selectedBlog.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-session-id': getSessionId()
        },
        body: JSON.stringify(formData)
      });
      if (response.status === 401) {
        alert('Please login to edit a blog');
        return;
      }
      const updatedBlog = await response.json();
      const updatedList = blogs.map(blog => 
        blog.id === selectedBlog.id ? updatedBlog : blog
      );
      setBlogs(updatedList);
      closeForm();
    } catch (err) {
      console.log('Error updating blog');
    }
  };

  // Delete blog
  const deleteBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${selectedBlog.id}`, { 
        method: 'DELETE',
        headers: { 'x-session-id': getSessionId() }
      });
      if (response.status === 401) {
        alert('Please login to delete a blog');
        return;
      }
      const filteredList = blogs.filter(blog => blog.id !== selectedBlog.id);
      setBlogs(filteredList);
      setShowDeleteConfirm(false);
      setSelectedBlog(null);
    } catch (err) {
      console.log('Error deleting blog');
    }
  };

  // Open add form
  const openAddForm = () => {
    setFormData({ title: '', description: '' });
    setShowAddForm(true);
  };

  // Open edit form
  const openEditForm = (blog) => {
    setSelectedBlog(blog);
    setFormData({ title: blog.title, description: blog.description });
    setShowEditForm(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteConfirm(true);
  };

  // Close all forms
  const closeForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowDeleteConfirm(false);
    setSelectedBlog(null);
    setFormData({ title: '', description: '' });
  };

  // Filter blogs by search
  const getFilteredBlogs = () => {
    if (!searchText) return blogs;
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredBlogs = getFilteredBlogs();

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 className="logo">My Blog</h1>
          {user && (
            <button className="btn-add" onClick={openAddForm}>
              + New Post
            </button>
          )}
        </div>
        <div className="header-right">
          {user ? (
            <div className="user-info">
              <span className="username">Welcome, {user.username}</span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn-login" onClick={() => openAuthModal('login')}>Login</button>
              <button className="btn-register" onClick={() => openAuthModal('register')}>Register</button>
            </div>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search posts..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Blog Posts */}
      <main className="main">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="no-posts">
            <p>No posts found</p>
          </div>
        ) : (
          <div className="posts-list">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="post-card">
                <div className="post-header">
                  <h2 className="post-title">{blog.title}</h2>
                  <span className="post-date">{blog.date}</span>
                </div>
                <p className="post-content">{blog.description}</p>
                {user && (
                  <div className="post-actions">
                    <button className="btn-edit" onClick={() => openEditForm(blog)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => openDeleteConfirm(blog)}>
                      Delete
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Add Blog Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Post</h2>
              <button className="close-btn" onClick={closeForm}>&times;</button>
            </div>
            <form onSubmit={createBlog}>
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn-submit">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Post</h2>
              <button className="close-btn" onClick={closeForm}>&times;</button>
            </div>
            <form onSubmit={updateBlog}>
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn-submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal confirm-box">
            <h3>Delete Post?</h3>
            <p>Are you sure you want to delete "{selectedBlog?.title}"?</p>
            <div className="form-buttons">
              <button className="btn-cancel" onClick={closeForm}>No, Keep</button>
              <button className="btn-delete-confirm" onClick={deleteBlog}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
              <button className="close-btn" onClick={() => setShowAuthModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAuth}>
              <div className="form-field">
                <label>Username</label>
                <input 
                  type="text" 
                  value={authData.username}
                  onChange={(e) => setAuthData({...authData, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input 
                  type="password" 
                  value={authData.password}
                  onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  required
                />
              </div>
              {authError && <p className="auth-error">{authError}</p>}
              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowAuthModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">{authMode === 'login' ? 'Login' : 'Register'}</button>
              </div>
            </form>
            <div className="auth-switch">
              {authMode === 'login' ? (
                <p>Don't have an account? <button onClick={() => setAuthMode('register')}>Register</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setAuthMode('login')}>Login</button></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;