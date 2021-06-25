require("dotenv").config({ path: "./server/.env" });
const express = require("express");

const cors = require("cors");
const connectDB = require("./database/db");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/auth", require("./routes/authApi"));

app.use("/api/posts", require("./routes/postsApi"));

app.use("/api/comment", require("./routes/commentsApi"));

app.get("/", (req, res) => {
  res.send("Hello to Blog Posts api");
});

app.use(require("./middleware/errorHandler"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
