# TaskFlow API

A RESTful Task Management API built with Node.js, Express, MongoDB, and JWT authentication.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

---

## Project Structure

```
taskflow-api/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Register, Login, Me
│   └── taskController.js   # CRUD for tasks
├── middleware/
│   └── authMiddleware.js   # JWT protect middleware
├── models/
│   ├── User.js             # User schema
│   └── Task.js             # Task schema
├── routes/
│   ├── authRoutes.js       # /api/auth/*
│   └── taskRoutes.js       # /api/tasks/*
├── .env.example
├── package.json
└── server.js
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo>
cd taskflow-api
npm install
```

### 2. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 3. Run the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint            | Access  | Description         |
|--------|---------------------|---------|---------------------|
| POST   | /api/auth/register  | Public  | Register new user   |
| POST   | /api/auth/login     | Public  | Login & get token   |
| GET    | /api/auth/me        | Private | Get current user    |

### Task Routes — `/api/tasks`

| Method | Endpoint         | Access  | Description              |
|--------|------------------|---------|--------------------------|
| POST   | /api/tasks       | Private | Create a task            |
| GET    | /api/tasks       | Private | Get all your tasks       |
| GET    | /api/tasks/:id   | Private | Get one task by ID       |
| PUT    | /api/tasks/:id   | Private | Update a task            |
| DELETE | /api/tasks/:id   | Private | Delete a task            |

> Private routes require `Authorization: Bearer <token>` header.

---

## Request & Response Examples

### Register

**POST** `/api/auth/register`

Request:
```json
{
  "name": "Harsh Patel",
  "email": "harsh@example.com",
  "password": "mypassword123"
}
```

Response `201`:
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Harsh Patel",
    "email": "harsh@example.com"
  }
}
```

---

### Login

**POST** `/api/auth/login`

Request:
```json
{
  "email": "harsh@example.com",
  "password": "mypassword123"
}
```

Response `200`:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Harsh Patel",
    "email": "harsh@example.com"
  }
}
```

---

### Create Task

**POST** `/api/tasks`  
Header: `Authorization: Bearer <token>`

Request:
```json
{
  "title": "Complete assignment",
  "description": "Finish the API project before deadline",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

Response `201`:
```json
{
  "success": true,
  "message": "Task created",
  "task": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "title": "Complete assignment",
    "description": "Finish the API project before deadline",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "64f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2024-08-01T10:00:00.000Z"
  }
}
```

---

### Get All Tasks

**GET** `/api/tasks`  
Header: `Authorization: Bearer <token>`

Optional query params:
- `?status=pending` — filter by status
- `?priority=high` — filter by priority
- `?sort=dueDate` — sort by due date

Response `200`:
```json
{
  "success": true,
  "count": 2,
  "tasks": [ ... ]
}
```

---

### Update Task

**PUT** `/api/tasks/:id`  
Header: `Authorization: Bearer <token>`

Request:
```json
{
  "status": "in-progress"
}
```

Response `200`:
```json
{
  "success": true,
  "message": "Task updated",
  "task": { ... }
}
```

---

### Delete Task

**DELETE** `/api/tasks/:id`  
Header: `Authorization: Bearer <token>`

Response `200`:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Status Codes Used

| Code | Meaning          |
|------|------------------|
| 200  | Success          |
| 201  | Created          |
| 400  | Bad Request      |
| 401  | Unauthorized     |
| 403  | Forbidden        |
| 404  | Not Found        |
| 500  | Server Error     |

---

## Testing in Postman

1. Register a user → copy the `token` from response
2. In Postman, go to **Authorization** tab → select **Bearer Token** → paste token
3. Use the token for all `/api/tasks` requests
