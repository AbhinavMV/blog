const express = require("express");
const {
  getPosts,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/postsApi");
const { protect, auth } = require("../middleware/postsAuth");

const router = express.Router();

router.patch("/updatepost", auth, updatePost);
router.delete("/deletepost", auth, deletePost);
router.post("/addpost", auth, addPost);
router.get("/", getPosts);

module.exports = router;
