const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./config/dbConfig");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

connectToDatabase();

const PORT = process.env.PORT || 5000;

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cors());

App.use("/api/notes", noteRoutes);
App.use("/api/users", userRoutes);

// Serve static files from the "dist" directory inside your frontend folder
App.use(express.static(path.join(__dirname, "frontend", "dist")));

// Handle all other routes by serving the index.html file
App.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

// I am using my custom error handler middleware
App.use(errorHandler);

App.listen(PORT, () => {
  console.log(`server running port : ${PORT}`);
});
