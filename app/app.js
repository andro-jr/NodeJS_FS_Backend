const express = require("express");

const app = express();
const cors = require("cors");

// middleware to form our contract for incoming json payloads ONLY!!!
app.use(express.json());

// middleware for url encoding
app.use(express.urlencoded({ extended: true }));

// middleware to handle cors policy
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Service is up" });
});

//routers

// handling bad urls
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

module.exports = app;