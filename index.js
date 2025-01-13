const express = require("express");
const connectDB = require("./db/connection");
const articleRoutes = require("./routes/articles");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/creator", articleRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
