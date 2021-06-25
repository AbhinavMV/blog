const Comment = require("../models/Comments");
const Posts = require("../models/Posts");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getComments = async (req, res, next) => {
  const postId = req.params.post;
  try {
    const comments = await Comment.find({ post: postId }).sort({
      createdAt: -1,
    });
    // console.log(comments);
    return res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  const postId = req.params.post;
  try {
    const commentData = new Comment({
      body: req.body.message,
      post: postId,
      commentor: JSON.parse(req.body.commentor),
    });
    const post = await Posts.findById({ _id: postId });
    // console.log(post);
    if (!post) return next(new ErrorResponse("Invalid request", 404));
    const comment = await commentData.save();
    await Posts.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } }
    );
    return res.status(200).json({ comment, message: "Successfully Posted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
