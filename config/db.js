const mongoose = require("mongoose");
const connection = require("./connection");

const connectDB = async () => {
  const conn = await mongoose.connect(connection);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
