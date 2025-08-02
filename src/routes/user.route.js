import express from "express";
import { followUser, getCurrentuser, getUserProfile, syncUser, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/profile/:username", getUserProfile);
userRoutes.post("/sync", protectRoute ,syncUser)
userRoutes.post("/me",protectRoute,getCurrentuser)
userRoutes.put("/profile", protectRoute,updateProfile)
userRoutes.put("/folow/:targetUserId", protectRoute,followUser)


export default userRoutes;
