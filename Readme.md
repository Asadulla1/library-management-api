# 📚 Library Management API

A simple **Library Management System** API built with **Express**, **TypeScript**, and **MongoDB** (via Mongoose).  
It supports full CRUD for Books, Borrowing logic, advanced filtering, aggregation pipeline usage, schema validation, business logic enforcement, and much more.

---

## 🎯 Objective

This project demonstrates:

✅ Schema validation  
✅ Business logic enforcement (Availability control when borrowing books)  
✅ Mongoose Aggregation Pipeline  
✅ Mongoose static & instance methods  
✅ Mongoose middleware (pre/post)  
✅ Filtering, sorting, and limiting features  
✅ Clean REST API structure

---

## 🚀 Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)

---

## 📦 API Endpoints

### 📘 Book Endpoints

| Method | Endpoint             | Description                                   |
| ------ | -------------------- | --------------------------------------------- |
| POST   | `/api/books`         | Create a new book                             |
| GET    | `/api/books`         | Retrieve all books (with filter, sort, limit) |
| GET    | `/api/books/:bookId` | Retrieve a specific book by ID                |
| PUT    | `/api/books/:bookId` | Update an existing book                       |
| DELETE | `/api/books/:bookId` | Delete a book                                 |

### 📖 Borrow Endpoints

| Method | Endpoint      | Description                                            |
| ------ | ------------- | ------------------------------------------------------ |
| POST   | `/api/borrow` | Borrow a book (with business logic enforcement)        |
| GET    | `/api/borrow` | Retrieve borrowed books summary (Aggregation pipeline) |

---

## 🔄 Business Logic (Borrow Book)

- Verify the book has enough available copies.
- Deduct the requested `quantity` from the book’s `copies`.
- If `copies` become 0:
  - Update `available` field to `false` (using Mongoose static or instance method).
- Save the borrow record with:
  - `book` reference
  - `quantity`
  - `dueDate`

## 🚦 For Your Understanding — HTTP Status Codes Are Listed Below:

| Status Code                   | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| **200 OK**                    | Successful GET, PUT, DELETE requests                   |
| **201 Created**               | Resource successfully created (POST)                   |
| **400 Bad Request**           | Validation failed or invalid request body/query params |
| **404 Not Found**             | Resource not found (Invalid bookId, etc.)              |
| **500 Internal Server Error** | Unexpected server-side error                           |

---

## 🏗️ Setting Up the Project Locally

Follow these steps to run this project on your local machine:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Asadulla1/library-management-api.git
cd library-management-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

**Create a .env file in the root directory and add the following:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library_db
```

- **You can update PORT or MONGO_URI as needed.**

### 4️⃣ Run the project

**For development mode (with auto-reload):**

```bash
npm run dev
```

## ✅ Now your API should be running at:

http://localhost:5000

- You can test endpoints using tools like:

  - Postman
  - Apidog

---

## Production Live Link:

### **_[Library Management](https://library-management-rose-ten.vercel.app/)_**

---

## 🙏 Thanks & Appreciation

I would like to express my sincere thanks to everyone who reviewed or contributed to this project.  
This Library Management API project was created as a learning exercise to practice working with **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

Thank you for taking the time to explore my work! 🚀

— _Asadulla Al Mamun_
