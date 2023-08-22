import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// Update User
router.put("/:id", verifyToken, updateUser);
//Get User
router.get("/find/:id", getUser);
//Delete User
router.delete("/:id", verifyToken, deleteUser);
// Follow
router.put("/follow/:id", verifyToken, followUser);
// Unfollow
router.put("/unfollow/:id", verifyToken, unfollowUser);

export default router;
