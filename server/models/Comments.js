const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    body: String,
    commentor: {
      userId: String,
      username: String,
      avatar: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentsSchema);
