import express from "express";
import auth from "../middleware/auth.middleware.js";
import { createBug, getAllBugs, getBugByCode, updateBugStatus } from "../controllers/bug.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getAllBugs);
router.get("/:bugCode", getBugByCode);
router.post(
  "/",
  auth,
  upload.array("attachments", 5), // ⬅️ NEW
  createBug,
);
router.patch("/:bugCode/status", auth, updateBugStatus);

export default router;
