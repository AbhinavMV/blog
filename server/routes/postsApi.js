const express = require("express");
const { getPosts } = require("../controllers/postsApi");
const { protect } = require("../middleware/postsAuth");

const router = express.Router();

router.get("/", protect, getPosts);

module.exports = router;
