const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  message: {
    type: String,
    default: "",
  },
  author: {
    type: String,
  },
  creatorId: {
    type: String,
    // required: [true, "Please provide creator email"],
  },
  tags: [String],
  selectedFile: {
    type: String,
    default: `https://source.unsplash.com/random?`,
  },
  likeCount: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
