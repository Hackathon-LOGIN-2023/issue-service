const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: String,
  description: String,
  date: String,
  photo: Buffer,
  location: String,
  status: {
    type: String,
    enum: ["pending", "closed"],
    default: "pending",
  },
  userId: Schema.Types.ObjectId,
  severity: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  category: {
    type: String,
    enum: ["category 1", "category 2", "category 3", "category 4"],
    default: "category 1",
  },
  votes: {
    userId: Schema.Types.ObjectId,
    value: Number,
  },
});

module.exports = mongoose.model("issue", issueSchema);
