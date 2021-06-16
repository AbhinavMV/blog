require("dotenv").config("../.env");
const express = require("express");
const connectDB = require("./database/db");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.use("/api/auth", require("./routes/authApi"));

app.use("/api/posts", require("./routes/postsApi"));

app.use(require("./middleware/errorHandler"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
