const mongoose = require("mongoose");

const dbconnnecion = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || typeof uri !== "string") {
    const got = uri === undefined ? "undefined" : typeof uri;
    throw new Error(
      `Missing or invalid MONGODB_URI in environment variables. ` +
        `mongoose.connect(uri) expects a string, got: ${got}. ` +
        `Create a .env file (see .env.example) and set: MONGODB_URI=your_mongodb_connection_string`
    );
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
};

module.exports = dbconnnecion;
