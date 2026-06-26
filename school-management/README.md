# 🏫 School Management System API
**DecodeLabs Industrial Training — Batch 2026 | Project 3: Database Integration**

---

## 📐 Architecture Overview

This project implements all 4 architectural pillars from the training specification:

| Pillar | Implementation |
|--------|---------------|
| **Pillar 1: Schema & Design** | 5 MongoDB collections with relationships (1:1, 1:Many, M:M) |
| **Pillar 2: Integration** | Mongoose ORM with connection pooling via `connectDB()` |
| **Pillar 3: CRUD & REST** | Full RESTful API across 4 resource endpoints |
| **Pillar 4: The Shield** | UNIQUE, NOT NULL, ENUM, CHECK constraints + safe Mongoose queries |

---

## 🗂️ Project Structure

```
school-management/
├── src/
│   ├── config/
│   │   └── db.js                  ← MongoDB connection (Pillar 2)
│   ├── models/
│   │   ├── User.js                ← Auth layer (email, password hash, role)
│   │   ├── Student.js             ← Student profile (1:1 → User)
│   │   ├── Teacher.js             ← Teacher profile (1:1 → User)
│   │   ├── Course.js              ← Course (Many:1 → Teacher)
│   │   └── Enrollment.js          ← Junction: Student ↔ Course (M:M)
│   ├── controllers/               ← Business logic (Pillar 3)
│   ├── routes/                    ← RESTful route definitions
│   └── middleware/
│       └── errorHandler.js        ← Global error handler (Pillar 4)
├── server.js                      ← Entry point
├── .env.example                   ← Environment variable template
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone and install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/school_management
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running locally, or use a MongoDB Atlas connection string in `MONGO_URI`.

### 4. Run the server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on http://localhost:5000
```

---

## 🔗 API Endpoints (Pillar 3 — CRUD + RESTful HTTP)

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/students` | Create student + user account |
| `GET` | `/api/students` | Get all students |
| `GET` | `/api/students/:id` | Get student by ID |
| `PUT` | `/api/students/:id` | Update student |
| `DELETE` | `/api/students/:id` | Delete student |

#### POST /api/students — Request Body
```json
{
  "email": "ali@school.com",
  "password": "secret123",
  "fullName": "Ali Hassan",
  "rollNumber": "CS-2026-001",
  "dateOfBirth": "2005-03-15",
  "age": 19,
  "phone": "9876543210",
  "address": "123 Main St, Kanpur"
}
```

---

### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/teachers` | Create teacher + user account |
| `GET` | `/api/teachers` | Get all teachers |
| `GET` | `/api/teachers/:id` | Get teacher by ID |
| `PUT` | `/api/teachers/:id` | Update teacher |
| `DELETE` | `/api/teachers/:id` | Delete teacher |

#### POST /api/teachers — Request Body
```json
{
  "email": "dr.sharma@school.com",
  "password": "secure456",
  "fullName": "Dr. Priya Sharma",
  "employeeId": "TCH-001",
  "specialization": "Computer Science",
  "phone": "9123456789"
}
```

---

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/courses` | Create course |
| `GET` | `/api/courses` | Get all courses |
| `GET` | `/api/courses/:id` | Get course by ID |
| `PUT` | `/api/courses/:id` | Update course |
| `DELETE` | `/api/courses/:id` | Delete course |

#### POST /api/courses — Request Body
```json
{
  "teacherId": "<teacher_objectid>",
  "title": "Introduction to Databases",
  "courseCode": "CS301",
  "description": "Fundamentals of relational and non-relational databases",
  "maxCapacity": 30
}
```

---

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/enrollments` | Enroll student in course |
| `GET` | `/api/enrollments` | Get all enrollments |
| `GET` | `/api/enrollments/student/:studentId` | Get enrollments by student |
| `PUT` | `/api/enrollments/:id` | Update enrollment status |
| `DELETE` | `/api/enrollments/:id` | Remove enrollment |

#### POST /api/enrollments — Request Body
```json
{
  "studentId": "<student_objectid>",
  "courseId": "<course_objectid>"
}
```

#### PUT /api/enrollments/:id — Request Body
```json
{
  "status": "completed"
}
```

---

## 🛡️ Pillar 4 — The Shield: Security & Integrity

| Protection | Implementation |
|------------|---------------|
| `UNIQUE` email | `unique: true` on `users.email` |
| `UNIQUE` rollNumber | `unique: true` on `students.rollNumber` |
| `UNIQUE` employeeId | `unique: true` on `teachers.employeeId` |
| `UNIQUE` courseCode | `unique: true` on `courses.courseCode` |
| **Compound UNIQUE** | `enrollmentSchema.index({ studentId, courseId }, { unique: true })` |
| `NOT NULL` critical fields | `required: true` on all critical fields |
| `ENUM` validation | `role`, `status` — only allowed values accepted |
| `CHECK age >= 5` | `min: [5, ...]` on `students.age` |
| `CHECK capacity >= 1` | `min: [1, ...]` on `courses.maxCapacity` |
| **Password Security** | `bcryptjs` hashing via pre-save hook, never stored plaintext |
| **Injection Safety** | Mongoose ORM — all inputs treated as data, never raw string queries |
| **Global Error Handler** | Catches Mongoose validation, duplicate key, and CastError uniformly |

---

## 🗺️ Relationship Map

```
users ──(1:1)──► students ──(1:Many)──► enrollments ◄──(Many:1)── courses
                                                                       │
users ──(1:1)──► teachers ─────────────────────────────────(1:Many)──►┘
```
