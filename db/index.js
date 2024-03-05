require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/userModel");

const connect = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

const disconnect = async () => {
  await mongoose.connection.close();
};

const findUser = async (obj) => {
  return await User.findOne(obj).exec();
};

const saveUser = async (newUser) => {
  return await newUser.save();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = { connect, disconnect, findUser, saveUser, clearDatabase };
