const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  description: String,
  date: String,
  image: String,
  location: {
    longitude: Number,
    latitude: Number,
  },
  status: {
    type: String,
    enum: ["pending", "closed"],
    default: "pending",
  },
  userId: Schema.Types.ObjectId,
  severity: {
    type: Number,
    enum: [1, 2, 3],
    default: 1,
  },
  category: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: "category 1",
  },
  votes: [
    {
      userId: Schema.Types.ObjectId,
      value: Number,
    },
  ],
});

module.exports = mongoose.model("issue", issueSchema);
