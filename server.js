// Require Dependencies
const express = require("express");
const routes = require("./server/routes");
const path = require("path"); // Path modülünü unutmayalım
const app = express();
const PORT = process.env.PORT || 8080;

// Import Middleware
const errorHandler = require("./middleware/errorHandler");

// Import DB
// Example using MongoDB and Mongoose.js ODM Below
// Info about MongoDB can be found at https://www.mongodb.com/what-is-mongodb
// Info about Mongoose.js can be found at https://mongoosejs.com/
// Uncomment the following lines if you are using MongoDB
// const mongoose = require("mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Add routes, both API and view
app.use(routes);

// Insert DB Info here =============================

// Example using MongoDB
// If deployed, use the deployed database. Otherwise, use the local database
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/<Your Database Name>";

// Set mongoose to leverage built-in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = global.Promise;
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// ================================================

// Custom middleware for logging or authentication (if needed)
// Example: Add authentication middleware here
// const authenticate = require("./middleware/authMiddleware");
// app.use(authenticate);

// Error handler middleware (added at the end)
app.use(errorHandler);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API server running on PORT ${PORT}!`);
});
