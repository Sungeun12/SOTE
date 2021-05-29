const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const voteRouter = require("./routes/vote");
const userRouter = require("./routes/user");
const groupRouter = require("./routes/group");
const noticeRouter = require("./routes/notice");
const commentRouter = require("./routes/comment");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
const { PORT, MONGO_URI } = process.env;

app.set("port", PORT);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  morgan("dev"),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  express.static("uploads")
);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use("/user", userRouter);
app.use("/vote", voteRouter);
app.use("/group", groupRouter);
app.use("/", noticeRouter);
app.use("/", commentRouter);

app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}...`);
});
