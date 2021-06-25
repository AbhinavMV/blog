const express = require("express");
const { addComment, getComments } = require("../controllers/commentsApi");
const router = express.Router();

router.post("/:post", addComment);
router.get("/:post", getComments);
module.exports = router;
