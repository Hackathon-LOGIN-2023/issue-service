const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  photo: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  userId: {
    type: String,
  },
  severity: {
    type: String,
  },
  category: {
    type: String,
    enum: ["category 1", "category 2", "category 3", "category 4"],
    default: "category 1",
  },
  votes: {
    userId: { type: String },
    value: { type: Number },
  },
});

module.exports = mongoose.model("issue", issueSchema);
