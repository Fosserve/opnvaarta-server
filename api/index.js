const express = require("express");// Import creator routes
const cors = require("cors");
const connectDB = require("../db/connection");
const articleRoutes = require("../routes/articles");
const creatorRoutes = require("../routes/creators");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/creators", creatorRoutes); // Corrected route for creators

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
