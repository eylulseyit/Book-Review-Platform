
# API Documentation

## User Routes

- **`GET /api/user/`**  
  _Get all users_  
  **Response:**
  ```json
  [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "bio": "Tech enthusiast."
    },
    ...
  ]
  ```

- **`GET /api/user/:id`**  
  _Get user profile by ID_  
  **Response:**
  ```json
  {
    "id": 52,
    "username": "jane_doe",
    "email": "jane@example.com",
    "bio": "Software developer."
  }
  ```

- **`PUT /api/user/:id`**  
  _Update user profile (username, email, password)_  
  **Request Body:**
  ```json
  {
    "username": "new_username",
    "email": "new_email@example.com",
    "password": "new_password"
  }
  ```
  **Response:**
  ```json
  {
    "id": 52,
    "username": "new_username",
    "email": "new_email@example.com"
  }
  ```

- **`PUT /api/user/:id/update-bio`**  
  _Update user bio_  
  **Request Body:**
  ```json
  {
    "bio": "Updated bio content."
  }
  ```
  **Response:**
  ```json
  {
    "id": 52,
    "bio": "Updated bio content.",
    "updatedAt": "2025-01-07T12:30:00Z"
  }
  ```

- **`DELETE /api/user/:id`**  
  _Delete user by ID_  
  **Response:**
  ```json
  {
    "message": "User deleted successfully."
  }
  ```

---

## Book Routes

- **`GET /api/books/all`**  
  _Get all books_  
  **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Book Title 1",
      "author": "Author 1",
      "genre": "Fiction",
      "year": 2023
    },
    ...
  ]
  ```

- **`GET /api/books/:id`**  
  _Get a specific book by ID_  
  **Response:**
  ```json
  {
    "id": 1,
    "title": "Book Title 1",
    "author": "Author 1",
    "genre": "Fiction",
    "year": 2023
  }
  ```

- **`POST /api/books/`**  
  _Create a new book_  
  **Request Body:**
  ```json
  {
    "title": "New Book",
    "author": "New Author",
    "genre": "Non-Fiction",
    "year": 2025
  }
  ```
  **Response:**
  ```json
  {
    "id": 2,
    "title": "New Book",
    "author": "New Author",
    "genre": "Non-Fiction",
    "year": 2025
  }
  ```

- **`PUT /api/books/:id`**  
  _Update a specific book by ID_  
  **Request Body:**
  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Author",
    "genre": "Updated Genre",
    "year": 2025
  }
  ```
  **Response:**
  ```json
  {
    "id": 1,
    "title": "Updated Book Title",
    "author": "Updated Author",
    "genre": "Updated Genre",
    "year": 2025
  }
  ```

- **`DELETE /api/books/:id`**  
  _Delete a specific book by ID_  
  **Response:**
  ```json
  {
    "message": "Book deleted successfully."
  }
  ```

---

## Authentication Routes

- **`POST /api/auth/register`**  
  _Register a new user_  
  **Request Body:**
  ```json
  {
    "username": "new_user",
    "email": "new_user@example.com",
    "password": "new_password"
  }
  ```
  **Response:**
  ```json
  {
    "message": "User registered successfully."
  }
  ```

- **`POST /api/auth/login`**  
  _Login an existing user_  
  **Request Body:**
  ```json
  {
    "email": "existing_user@example.com",
    "password": "user_password"
  }
  ```
  **Response:**
  ```json
  {
    "message": "Login successful.",
    "token": "JWT_TOKEN_HERE"
  }
  ```

---

### Notes:
- **URL Parameters:**
  - `:id` represents the ID of a specific user or book.
- **Authentication:**  
  - For routes like user-related actions (`POST /login`, `POST /register`), authentication may not be needed. However, for other routes, you can include authorization tokens in the request headers if necessary.
- **Error Handling:**  
  - Document potential error responses for each route (e.g., 400, 404, 500).
