const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("MongoDB ERROR:", err);
  });

app.listen(3000, () => {
  console.log("server listing on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
