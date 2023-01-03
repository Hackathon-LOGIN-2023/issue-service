const mongoose = require("mongoose");
require("dotenv").config();
const mongoRUI = process.env.mongoRUI;

const connectDB = () => {
  try {
    // connect to mongoDB
    mongoose.connect(mongoRUI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
