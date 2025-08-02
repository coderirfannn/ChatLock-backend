import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, deletePost, getPost, getPosts, getUserPosts, likePost } from "../controllers/post.controller.js";
import upload from "../middleware/upload.middleware.js";

export const postRoute = express.Router();

// public routes
postRoute.get("/", getPosts);
postRoute.get("/:postId", getPost);
postRoute.get("/user/:username", getUserPosts);

// protected proteced
postRoute.post("/", protectRoute, upload.single("image"), createPost);
postRoute.post("/:postId/like", protectRoute, likePost);
postRoute.delete("/:postId", protectRoute, deletePost);
