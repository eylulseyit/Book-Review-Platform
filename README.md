# Book Review Platform

## Description
Book Review Platform is a web application where users can rate, review, and organize books into reading lists. Built using Node.js, MySQL, and an MVC structure, the platform provides a space to share thoughts on books and discover new reads.

## Features
- User authentication and profile management
- Rate and review books
- Create and manage reading lists
- Explore books and view others' reviews
- Search for books by title or author

## Tech Stack
- **Backend:** Node.js, Express.js, MySQL
- **Frontend:** React.js
- **Architecture:** Model-View-Controller (MVC)

## Database
The application uses a MySQL database running locally. It stores user information, book details, reviews, and reading lists.

### Database Setup
1. Install MySQL and create a database named `book_site`. Note: Use an underscore (`_`) instead of a hyphen (`-`) to avoid connection issues.
2. Configure your database credentials in `server/config/database.js`:
   ```javascript
   const sequelize = new Sequelize('book_site', 'root', 'your_password', {
       host: 'localhost',
       dialect: 'mysql',
   });
   ```
3. Ensure MySQL is running locally before starting the server.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/eylulseyit/Book-Review-Platform.git
   cd Book-Review-Platform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Usage
- Visit the homepage to browse books
- Click a book to read reviews or add your own
- Use the dashboard to manage your reading lists

## API Documentation
Refer to `api_documentation.md` for details about available endpoints, request/response formats, and authentication methods.

## Directory Structure
```
├── client/             # Frontend code
├── server/             # Backend code
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   └── app.js          # Express app setup
├── database/           # Database scripts
├── api_documentation.md
├── README.md
└── package.json
```

## Feedback
If you have any feedback or suggestions, feel free to open an issue on GitHub.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For questions or feedback, please open an issue on GitHub or contact the project maintainers directly.
