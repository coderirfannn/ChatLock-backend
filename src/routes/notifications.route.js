import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getNotifications } from "../controllers/notificatin.controller.js";
import { deleteComment } from "../controllers/comment.controller.js";


const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/:notificationId", protectRoute, deleteComment);

export default router;