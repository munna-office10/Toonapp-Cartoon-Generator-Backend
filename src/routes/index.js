import avatarRoutes from "./avatar.routes.js";
import express from "express";
const router = express.Router();

router.use("/avatar", avatarRoutes);

export default router;