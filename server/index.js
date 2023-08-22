import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING!");
});

const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    })
  )
  .catch((err) => {
    throw err;
  });
