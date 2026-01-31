import express from "express";
import auth from "../middleware/auth.middleware.js";
import { approveSubmission, getSubmissionsByBug, submitSolution } from "../controllers/submission.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  auth,
  upload.array("attachments", 5), // ⬅️ NEW
  submitSolution,
);

router.post("/approve/:submissionCode", auth, approveSubmission);
router.get("/bug/:bugCode", auth, getSubmissionsByBug);

export default router;
