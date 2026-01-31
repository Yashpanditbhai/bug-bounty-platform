import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getLoggedInUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", auth, getLoggedInUser);

export default router;
