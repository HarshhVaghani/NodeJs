# Blog Project Specification

## 1. Project Overview
- **Project Name**: Blog Application
- **Type**: Full-stack Web Application (React + Node.js)
- **Core Functionality**: A CRUD blog application where users can create, read, update, and delete blog posts
- **Target Users**: General users wanting to read/write blog posts

## 2. UI/UX Specification

### Layout Structure
- **Header**: Fixed top navigation with logo and add blog button
- **Hero Section**: Welcome area with search bar
- **Content Area**: Grid of blog cards (3 columns desktop, 2 tablet, 1 mobile)
- **Modal**: Form for adding/editing blogs
- **Footer**: Simple copyright footer

### Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

### Visual Design
- **Color Palette**:
  - Primary: #6366f1 (Indigo)
  - Secondary: #8b5cf6 (Purple)
  - Accent: #f472b6 (Pink)
  - Background: #0f172a (Dark slate)
  - Card Background: #1e293b
  - Text Primary: #f8fafc
  - Text Secondary: #94a3b8
  - Success: #22c55e
  - Danger: #ef4444

- **Typography**:
  - Font Family: 'Inter', sans-serif
  - Headings: Bold, 1.5rem - 2rem
  - Body: Regular, 1rem
  - Small: 0.875rem

- **Spacing System**:
  - Base unit: 4px
  - Padding: 16px (cards), 24px (sections)
  - Gap: 24px (grid)

- **Visual Effects**:
  - Card hover: translateY(-4px) with shadow
  - Gradient background on header
  - Smooth transitions (0.3s ease)
  - Modal backdrop blur

### Components
1. **Header**: Logo, navigation, "Add Blog" button
2. **Search Bar**: Input with icon, filters blogs in real-time
3. **Blog Card**: Image placeholder, title, excerpt, date, action buttons
4. **Blog Modal**: Form with title, description fields
5. **Confirm Dialog**: For delete confirmation

## 3. Functionality Specification

### Core Features
- **Create Blog**: Modal form with title and description
- **Read Blogs**: Display all blogs in card grid
- **Update Blog**: Edit existing blog via modal
- **Delete Blog**: Confirmation dialog before delete
- **Search**: Real-time filtering by title/description

### User Interactions
- Click "Add Blog" → Opens empty form modal
- Click "Edit" on card → Opens pre-filled form modal
- Click "Delete" → Shows confirmation, then removes
- Type in search → Filters visible cards instantly

### Data Handling
- Backend: Node.js with Express
- Storage: In-memory array (simulating database)
- API: RESTful endpoints (/api/blogs)

### API Endpoints
- GET /api/blogs - Get all blogs
- POST /api/blogs - Create new blog
- PUT /api/blogs/:id - Update blog
- DELETE /api/blogs/:id - Delete blog

## 4. Sample Data
Pre-populate with 6 blog posts covering various topics (tech, lifestyle, travel, etc.)

## 5. Acceptance Criteria
- [ ] Header displays with logo and add button
- [ ] Blog grid shows all posts in responsive layout
- [ ] Add blog modal opens and creates new post
- [ ] Edit blog pre-fills data and updates correctly
- [ ] Delete removes blog after confirmation
- [ ] Search filters blogs by title/description
- [ ] Responsive on all screen sizes
- [ ] Smooth animations and transitions