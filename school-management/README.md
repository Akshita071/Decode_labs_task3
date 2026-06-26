# School Management System API

A RESTful backend built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for managing students, teachers, courses, and enrollments.

The project demonstrates database design, CRUD operations, relationships in MongoDB, input validation, and secure data handling using Mongoose.

---

## Features

* Student management
* Teacher management
* Course management
* Student enrollment system
* Password hashing using bcrypt
* Input validation with Mongoose
* Global error handling
* RESTful API structure

---

## Database Design

The application uses five collections:

* **User** – Stores login information and user roles.
* **Student** – Student profile linked to a user.
* **Teacher** – Teacher profile linked to a user.
* **Course** – Course details assigned to a teacher.
* **Enrollment** – Links students and courses.

### Relationships

* One User → One Student
* One User → One Teacher
* One Teacher → Many Courses
* Many Students ↔ Many Courses (through Enrollment)

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcryptjs
* dotenv

---

## Project Structure

```text
school-management/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── controllers/
│   ├── routes/
│   └── middleware/
│       └── errorHandler.js
├── server.js
├── .env.example
└── package.json
```

---

## Installation

Clone the repository and install dependencies.

```bash
npm install
```

Create a `.env` file using `.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/school_management
NODE_ENV=development
```

Start MongoDB locally (or use a MongoDB Atlas URI).

Run the project:

```bash
npm run dev
```

or

```bash
npm start
```

If everything is configured correctly, the server will start on:

```
http://localhost:5000
```

---

## API Endpoints

### Students

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | `/api/students`     |
| GET    | `/api/students`     |
| GET    | `/api/students/:id` |
| PUT    | `/api/students/:id` |
| DELETE | `/api/students/:id` |

Example request:

```json
{
  "email": "ali@school.com",
  "password": "secret123",
  "fullName": "Ali Hassan",
  "rollNumber": "CS-2026-001",
  "dateOfBirth": "2005-03-15",
  "age": 19,
  "phone": "9876543210",
  "address": "123 Main St"
}
```

---

### Teachers

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | `/api/teachers`     |
| GET    | `/api/teachers`     |
| GET    | `/api/teachers/:id` |
| PUT    | `/api/teachers/:id` |
| DELETE | `/api/teachers/:id` |

---

### Courses

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/courses`     |
| GET    | `/api/courses`     |
| GET    | `/api/courses/:id` |
| PUT    | `/api/courses/:id` |
| DELETE | `/api/courses/:id` |

---

### Enrollments

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| POST   | `/api/enrollments`                    |
| GET    | `/api/enrollments`                    |
| GET    | `/api/enrollments/student/:studentId` |
| PUT    | `/api/enrollments/:id`                |
| DELETE | `/api/enrollments/:id`                |

---

## Validation

The application includes several validations to maintain data integrity.

* Email must be unique.
* Roll number must be unique.
* Employee ID must be unique.
* Course code must be unique.
* A student cannot enroll in the same course twice.
* Required fields are validated before saving.
* User roles and enrollment status use enum validation.
* Student age must be at least 5 years.
* Course capacity must be greater than 0.
* Passwords are hashed before storing them in the database.

---

## Folder Responsibilities

* **config** – Database connection
* **models** – Mongoose schemas
* **controllers** – Business logic
* **routes** – API endpoints
* **middleware** – Error handling

---

## Future Improvements

* JWT Authentication
* Role-based authorization
* Pagination and filtering
* Search functionality
* API documentation with Swagger
* Unit and integration testing
