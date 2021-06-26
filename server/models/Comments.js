const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  body: String,
  commentor: {
    userId: String,
    username: String,
    avatar: String,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Comment", CommentsSchema);
