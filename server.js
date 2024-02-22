// Import necessary modules
const express = require("express");
const cors = require("cors");

// Import database configuration
const configureDB = require("./config/configureDB");

// Create an Express app
const app = express();
const port = process.env.PORT || 3030;

// Import route handlers
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const feedRouter = require("./routes/feedRoutes");

// Connect to the database
configureDB();

// Middleware setup
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Define routes
app.use("/users", userRouter); // User-related routes
app.use("/category", categoryRouter); // Category-related routes
app.use("/feeds", feedRouter); // Feed-related routes

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
