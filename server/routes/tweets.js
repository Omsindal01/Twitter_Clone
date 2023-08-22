import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  getTweet,
  deleteTweet,
  updateTweet,
  likeOrDislikeTweet,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} from "../controllers/tweet.js";
const router = express.Router();

//Create a tweet
router.post("/", verifyToken, createTweet);
//Get a tweet
router.get("/:id", verifyToken, getTweet);
//Update a tweet
router.put("/:id", verifyToken, updateTweet);
//Delete a tweet
router.delete("/:id", verifyToken, deleteTweet);
//Like/Dislike a tweet
router.put("/:id/like", verifyToken, likeOrDislikeTweet);
// Get all timeline tweet
router.get("/timeline/:id", verifyToken, getAllTweets);
//Get user tweet only
router.get("/user/all/:id", verifyToken, getUserTweets);
//Explore
router.get("/explore", getExploreTweets);

export default router;
