const mongoose = require("mongoose");
const Comments = require("./Comments");
const PostSchema = mongoose.Schema(
  {
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
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
