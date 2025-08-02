import express from "express";
import { createComment, deleteComment, getComments } from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
export const commentRoute = express.Router();

// public routes
commentRoute.get("/post/:postId", getComments);

// protected routes
commentRoute.post("/post/:postId", protectRoute, createComment);
commentRoute.delete("/:commentId", protectRoute, deleteComment);
