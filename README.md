# Book Review API

A RESTful API backend Server built with Node.js, Express, and MongoDB to manage books and user-submitted reviews.
It includes JWT-based authentication, pagination, filtering and dockerization.

---

## Features

- User authentication (JWT)
- Add, browse, search books
- Submit, update, and delete reviews
- Pagination & filtering support
- Dockerized for easy deployment

---

## Project Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/JaySanduke/bookReviewAPI.git
cd bookReviewAPI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb+srv://jaysanduke:3nGK3pPk0X00B8q2@cluster0.6pcusxt.mongodb.net/bookReviewDBretryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=StrongJWTSecret
JWT_EXPIRATION=1d
NODE_ENV=development
```

### 4. Start the server

```bash
npm start
```

---

## Postman Collection

You can import the Postman collection from the `Book Review.postman_collection.json` file to test the API endpoints.

---

## Decisions & Assumptions

- *JWT used for authentication
- *Only One review per user per book is allowed
- *Rating scores (1–5) are validated
- *Book listing supports pagination & filtering by author/genre
- *Mongoose is used for MongoDB interactions
- *Central error handler standardizes API responses

---

## Database Schema

### User Schema

```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Book Schema

```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  description: String,
  createdBy: ObjectId (User),
  createdAt: Date
}
```

### Review Schema

```javascript
{
  _id: ObjectId,
  bookId: ObjectId (Book),
  userId: ObjectId (User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

---

## Relationships of Entities

- *User ↔ Review:
  - *One-to-Many
  - *One user can write many reviews
  - *Each review is linked to one user

- *Book ↔ Review:
  - *One-to-Many
  - *One book can have many reviews
  - *Each review belongs to one book

- *Book ↔ User:
  - *One-to-Many (creator)
  - *A user can create multiple books
  - *Each book is created by one user

## ER Diagram

![ER Diagram](./ER%20Diagram.png)
