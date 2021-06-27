const Posts = require("../models/Posts");
const Comments = require("../models/Comments");
const User = require("../models/User");
exports.getPosts = async (req, res, next) => {
  try {
    let lim = parseInt(req.query.limit) || 5;
    let page = parseInt(req.query.page) || 1;
    let max = await Posts.countDocuments();
    let totalPages = Math.ceil(max / lim);
    if (req.query.post) {
      posts = await Posts.findById(req.query.post);
      return res.status(200).json({ posts });
    } else {
      posts = await Posts.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * lim)
        .limit(lim);
    }

    return res.status(200).json({
      posts,
      // : posts.map((p) => ({ id: p._id, date: p.createdAt }))
      pageinationData: { limit: lim, page, totalPages },
    });
  } catch (error) {
    next(error);
  }
};

// exports.getPosts = async (req, res, next) => {
//   try {
//     let lim = 3;
//     let page = 3;
//     let max = await Posts.countDocuments();
//     // let skip = (page-1)*lim
//     let totalPages = Math.ceil(max / lim);
//     if (req.params.post !== "null") {
//       posts = await Posts.findById(req.params.post);
//     } else {
//       posts = await Posts.find()
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * lim)
//         .limit(lim);
//     }

//     return res.status(200).json({ posts,pageinationData:{} });
//   } catch (error) {
//     next(error);
//   }
// };

exports.addPost = async (req, res, next) => {
  const { title, message, tags, selectedFile } = req.body;
  let allTags = "";
  if (tags) {
    allTags = tags.split(",");
  }
  let id = "";
  if (req.google) id = req.user.sub;
  else id = req.user.id;
  try {
    const post = await Posts.create({
      title,
      message,
      selectedFile,
      tags: allTags,
      creatorId: id,
      author: req.user.name,
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { posts: post._id } });
    return res.status(200).json({ success: "true", message: "Successfully Posted" });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const { _id } = req.body;
  try {
    if (!req.body.comment) {
      await Posts.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({ success: true, message: "Successfully updated" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  const userId = req.body.id;

  try {
    let p = "";
    const post = await Posts.findById(req.params.post);
    if (!post.likes.find((id) => id === userId)) {
      p = await Posts.findByIdAndUpdate(
        req.params.post,
        {
          $push: { likes: userId },
        },
        { new: true }
      );
    } else {
      p = await Posts.findByIdAndUpdate(
        req.params.post,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
    }
    const likesCount = p.likes.length;
    return res.status(200).json({ success: true, likesCount });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Posts.findByIdAndDelete(id);
    await Comments.deleteMany({ post: id });
    return res.status(200).json({ success: true, message: "Successfully Deleted" });
  } catch (error) {
    next(error);
  }
};

//MULTER
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "server/public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage }).single("file");
// const data = upload(req, res, function (err) {
//   // console.log(req.file);
//   if (err instanceof multer.MulterError) {
//     return res.status(500).json(err);
//   } else if (err) {
//     return res.status(500).json(err);
//   }
//   // return res.status(200).send(req.file);
//   // console.log(req);
//   return req.file;
// });
// console.log(data);
