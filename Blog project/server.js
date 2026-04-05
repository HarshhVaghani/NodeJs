const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'blog-secret-key-2026';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory session storage
const sessions = {};
// In-memory user storage
const users = [];

// Session middleware
const isAuthenticated = (req, res, next) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId && sessions[sessionId]) {
    req.user = sessions[sessionId];
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword
  };
  
  users.push(newUser);
  
  const sessionId = crypto.randomBytes(32).toString('hex');
  sessions[sessionId] = { id: newUser.id, username: newUser.username };
  
  res.json({ 
    message: 'Registration successful',
    sessionId,
    user: { id: newUser.id, username: newUser.username }
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  const user = users.find(u => u.username === username && u.password === hashedPassword);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const sessionId = crypto.randomBytes(32).toString('hex');
  sessions[sessionId] = { id: user.id, username: user.username };
  
  res.json({ 
    message: 'Login successful',
    sessionId,
    user: { id: user.id, username: user.username }
  });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    delete sessions[sessionId];
  }
  res.json({ message: 'Logged out successfully' });
});

// Get current user endpoint
app.get('/api/me', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId && sessions[sessionId]) {
    res.json({ user: sessions[sessionId] });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

let blogs = [
  {
    id: 1,
    title: "Getting Started with React in 2026",
    description: "React continues to evolve with exciting new features. In this comprehensive guide, we'll explore the latest React 19 features including Server Components, Actions, and the new compiler. Whether you're a beginner or an experienced developer, this tutorial will help you understand modern React development patterns and best practices for building performant applications.",
    date: "2026-04-01",
    category: "Technology"
  },
  {
    id: 2,
    title: "The Art of Minimalist Living",
    description: "Discover how embracing minimalism can transform your life. This post explores practical tips for decluttering your space, simplifying your schedule, and focusing on what truly matters. Learn how less can actually be more when it comes to finding happiness and fulfillment in our fast-paced world.",
    date: "2026-03-28",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "Top 10 Hidden Gems in Japan",
    description: "Beyond Tokyo and Kyoto lie countless hidden treasures waiting to be discovered. From the ancient forests of Yakushima to the peaceful temples of Naoshima, this travel guide takes you off the beaten path to experience the real Japan. Includes practical tips for transportation, accommodation, and local customs.",
    date: "2026-03-25",
    category: "Travel"
  },
  {
    id: 4,
    title: "Mastering TypeScript Generics",
    description: "TypeScript generics can seem intimidating at first, but they're incredibly powerful for creating reusable, type-safe code. This in-depth tutorial covers everything from basic type parameters to advanced conditional types and mapped types. Real-world examples demonstrate how to apply these concepts in your projects.",
    date: "2026-03-20",
    category: "Programming"
  },
  {
    id: 5,
    title: "Morning Routines of Successful People",
    description: "What do billion-dollar founders, Olympic athletes, and creative geniuses have in common? They all swear by structured morning routines. We interviewed 50 successful individuals to compile this comprehensive guide on optimizing your mornings for peak performance and productivity.",
    date: "2026-03-15",
    category: "Productivity"
  },
  {
    id: 6,
    title: "The Future of AI in Web Development",
    description: "Artificial Intelligence is revolutionizing how we build websites and applications. From AI-powered code completion to automated testing and deployment, explore how machine learning is transforming every aspect of web development. We also discuss the ethical implications and what skills developers need to stay relevant.",
    date: "2026-03-10",
    category: "Technology"
  },
  {
    id: 7,
    title: "Budget Travel: Asia on $50 a Day",
    description: "Backpacking through Southeast Asia doesn't have to break the bank. This detailed guide reveals insider tips for traveling cheaply through Thailand, Vietnam, Cambodia, and Indonesia. Learn where to find cheap accommodation, how to negotiate prices, and which foods to eat for maximum savings.",
    date: "2026-03-05",
    category: "Travel"
  },
  {
    id: 8,
    title: "Understanding CSS Grid and Flexbox",
    description: "Master modern CSS layout techniques with this comprehensive comparison of Grid and Flexbox. We'll explore when to use each approach, common pitfalls to avoid, and practical examples for building responsive interfaces. Includes a handy cheat sheet and interactive examples you can try yourself.",
    date: "2026-02-28",
    category: "Programming"
  },
  {
    id: 9,
    title: "The Rise of Remote Work Culture",
    description: "Remote work has transformed from a necessity to a permanent shift in how we think about employment. This article explores the benefits and challenges of distributed teams, best practices for staying productive while working from home, and how companies are reimagining office spaces for a hybrid future.",
    date: "2026-02-20",
    category: "Business"
  },
  {
    id: 10,
    title: "Plant-Based Diet: A Beginner's Guide",
    description: "Transitioning to a plant-based diet doesn't have to be overwhelming. Learn about essential nutrients, easy meal prep strategies, and delicious recipes that make plant-based eating enjoyable. We also address common misconceptions and provide tips for eating out and traveling on a vegan diet.",
    date: "2026-02-15",
    category: "Health"
  },
  {
    id: 11,
    title: "Building Your First Mobile App",
    description: "Ever dreamed of creating your own mobile application? This step-by-step guide walks you through the entire process from concept to launch. Learn about choosing the right framework, designing user interfaces, implementing features, and submitting your app to the App Store and Google Play.",
    date: "2026-02-10",
    category: "Technology"
  },
  {
    id: 12,
    title: "The Psychology of Procrastination",
    description: "Why do we procrastinate and how can we overcome it? Drawing on the latest psychological research, this post explores the root causes of procrastination, effective strategies to beat it, and how to build better habits. Includes practical exercises and tools to help you get things done.",
    date: "2026-02-05",
    category: "Productivity"
  },
  {
    id: 13,
    title: "Exploring Portugal's Coastal Gems",
    description: "From the surfing paradise of Nazare to the serene beaches of the Algarve, Portugal offers diverse coastal experiences. This travel guide covers the best beach towns, local cuisine to try, and hidden beaches that most tourists miss. Perfect for your next European beach vacation.",
    date: "2026-01-28",
    category: "Travel"
  },
  {
    id: 14,
    title: "Node.js Performance Optimization",
    description: "Learn how to squeeze every drop of performance from your Node.js applications. This deep-dive covers profiling, memory management, caching strategies, and asynchronous patterns. Real-world benchmarks demonstrate the impact of various optimization techniques.",
    date: "2026-01-20",
    category: "Programming"
  },
  {
    id: 15,
    title: "Mindful Living in a Digital World",
    description: "In an age of constant connectivity, finding moments of peace can feel impossible. Discover practical techniques for maintaining mindfulness amidst the digital chaos. Learn how to create healthy boundaries with technology and cultivate present-moment awareness in daily life.",
    date: "2026-01-15",
    category: "Lifestyle"
  },
  {
    id: 16,
    title: "Investment Basics for Young Adults",
    description: "Starting to invest in your 20s can set you up for financial freedom later in life. This comprehensive guide covers stocks, bonds, ETFs, retirement accounts, and the basics of building a diversified portfolio. Learn the importance of compound interest and starting early.",
    date: "2026-01-10",
    category: "Finance"
  },
  {
    id: 17,
    title: "The Magic of Icelandic Photography",
    description: "Iceland offers some of the most dramatic and unique landscapes on Earth. Professional photographers share their secrets for capturing the Northern Lights, waterfalls, glaciers, and volcanic terrain. Includes composition tips, best times to shoot, and post-processing techniques.",
    date: "2026-01-05",
    category: "Photography"
  },
  {
    id: 18,
    title: "Introduction to Machine Learning",
    description: "Machine learning is transforming every industry. This beginner-friendly introduction explains key concepts like supervised learning, neural networks, and deep learning without heavy mathematical jargon. Includes code examples and resources for building your first ML model.",
    date: "2025-12-28",
    category: "Technology"
  }
];

app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

// Protected routes - require authentication
app.post('/api/blogs', isAuthenticated, (req, res) => {
  const { title, description, category } = req.body;
  const newBlog = {
    id: Date.now(),
    title,
    description,
    date: new Date().toISOString().split('T')[0],
    category: category || 'General'
  };
  blogs.unshift(newBlog);
  res.json(newBlog);
});

app.put('/api/blogs/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const index = blogs.findIndex(b => b.id === parseInt(id));
  if (index !== -1) {
    blogs[index] = { ...blogs[index], title, description, category: category || blogs[index].category };
    res.json(blogs[index]);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

app.delete('/api/blogs/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  blogs = blogs.filter(b => b.id !== parseInt(id));
  res.json({ message: 'Blog deleted' });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});