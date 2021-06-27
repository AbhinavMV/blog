const User = require("../models/User");
const Posts = require("../models/Posts");
const Comments = require("../models/Comments");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      name: `${fName} ${lName}`,
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide a valid email or password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorResponse("Please enter an Email ID", 400));
  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorResponse("Invalid email", 401));

    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetURL = `https://inspire-poem-blog.netlify.app/resetpassword/${resetToken}`;
    const message = `
      <h1> You have requested a password reset </h1>
      <p> Please go to this link to reset your password </p>
      <a href=${resetURL} clicktracking=off>${resetURL}</a>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        text: message,
      });
      return res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return next(new ErrorResponse("Invalid request", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return res.status(201).json({
      success: true,
      data: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { fname, lname, email, imageUrl, password } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.id });
    user.name = `${fname} ${lname}`;
    user.email = email;
    user.imageUrl = imageUrl;
    if (password) {
      user.password = password;
    }
    const newUser = await user.save();
    await Posts.updateMany({ creatorId: req.params.id }, { $set: { author: newUser.name } });
    const commentor = {
      userId: req.params.id,
      username: newUser.name,
      avatar: newUser.imageUrl,
    };
    await Comments.updateMany(
      { commentor: { userId: req.params.id } },
      { $set: { commentor: commentor } }
    );
    sendToken(newUser, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { posts } = await User.findByIdAndDelete(id);
    posts.map(async (postId) => {
      const { comments } = await Posts.findByIdAndDelete(postId);
      comments.map(async (commentId) => await Comments.findByIdAndDelete(commentId));
    });
    return res.status(200).json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  return res.status(statusCode).json({ result: user, token });
};
