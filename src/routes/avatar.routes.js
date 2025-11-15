import express from "express";
import multer from "multer";
import { generateAvatarController } from "../controllers/avatar.controller.js";
import { attachUser } from "../middleware/authMiddleware.js";
const avatarRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

avatarRouter.post("/generate", attachUser, upload.single("faceImage"), generateAvatarController)



export default avatarRouter;    