const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
} = require("../controllers/authApi");
const { auth } = require("../middleware/postsAuth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);

router.patch("/update/:id", auth, updateUser);
router.delete("/deleteuser/:id", auth, deleteUser);
module.exports = router;
