const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users.js");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ashishanand963:password1234@cluster0.d52yfiq.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define a port
const PORT = process.env.PORT || 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
