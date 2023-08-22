import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only update your own account."));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.deleteMany({ userId: req.params.id });
      res.status(200).json("User Deleted!");
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only delete your own account."));
  }
};

export const followUser = async (req, res, next) => {
  try {
    // user
    const user = await User.findById(req.params.id);
    // current user
    const currentUser = await User.findById(req.body.id);
    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
      res.status(200).json("Following the user!");
    } else {
      res.status(403).json("You already follow this user!");
    }
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    // user
    const user = await User.findById(req.params.id);
    // current user
    const currentUser = await User.findById(req.body.id);
    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $pull: { following: req.params.id },
      });
      res.status(200).json("Unfollowing the user!");
    } else {
      res.status(403).json("You do not follow this user!");
    }
  } catch (error) {
    next(error);
  }
};
