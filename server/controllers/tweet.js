import Tweet from "../models/Tweet.js";
import User from "../models/User.js";
import { handleError } from "../error.js";

export const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    handleError(500, err);
  }
};

export const getTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    res.status(200).json(tweet);
  } catch (err) {
    handleError(500, err);
  }
};

export const updateTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.user.id) {
      const updatedTweet = await Tweet.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedTweet);
    } else {
      handleError(500, "You are only allowed to edit your own tweets.");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.user.id) {
      await tweet.deleteOne();
      res.status(200).json("Tweet has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislikeTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({
        $push: { likes: req.body.id },
      });
      res.status(200).json("Tweet has been liked!");
    } else {
      await tweet.updateOne({
        $pull: { likes: req.body.id },
      });
      res.status(200).json("Tweet has been disliked!");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followingTweets = await Promise.all(
      currentUser.following.map((followingId) => {
        return Tweet.find({ userId: followingId });
      })
    );
    const allTweets = userTweets.concat(...followingTweets);
    allTweets.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(allTweets);
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};

export const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });
    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};
