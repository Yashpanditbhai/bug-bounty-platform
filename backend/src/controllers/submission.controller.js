// import Submission from "../models/Submission.model.js";
// import Bug from "../models/Bug.model.js";
// import User from "../models/User.model.js";
// import { generateCode } from "../utils/codeGenerator.js";
// import { successResponse, errorResponse } from "../utils/response.dto.js";

// export const submitSolution = async (req, res) => {
//   const submissionCode = await generateCode(Submission, "SUB");

//   const attachments = (req.files || []).map((file) => ({
//     url: `/uploads/${file.filename}`,
//     type: file.mimetype.split("/")[0],
//     name: file.originalname,
//   }));

//   const submission = await Submission.create({
//     submissionCode,
//     bugCode: req.body.bugCode,
//     submittedBy: req.user.userCode,
//     description: req.body.description,
//     attachments,
//   });

//   return successResponse(res, "Solution submitted", submission, 201);
// };

// export const approveSubmission = async (req, res) => {
//   try {
//     const { submissionCode } = req.params;

//     const submission = await Submission.findOne({ submissionCode });
//     if (!submission) {
//       return errorResponse(res, "Submission not found", 404);
//     }

//     const bug = await Bug.findOne({ bugCode: submission.bugCode });
//     if (!bug) {
//       return errorResponse(res, "Bug not found for this submission", 404);
//     }

//     if (bug.createdBy !== req.user.userCode) {
//       return errorResponse(res, "Not allowed", 403);
//     }

//     submission.approved = true;
//     await submission.save();

//     bug.status = "Closed";
//     bug.winner = submission.submittedBy;
//     await bug.save();

//     await User.findOneAndUpdate({ userCode: submission.submittedBy }, { $inc: { totalEarnings: bug.bounty } });

//     return successResponse(res, "Winner approved");
//   } catch (e) {
//     return errorResponse(res, e.message);
//   }
// };

// export const getSubmissionsByBug = async (req, res) => {
//   try {
//     const { bugCode } = req.params;

//     const submissions = await Submission.find({ bugCode });

//     return successResponse(res, "Submissions fetched", submissions);
//   } catch (e) {
//     return errorResponse(res, e.message);
//   }
// };

import Submission from "../models/Submission.model.js";
import Bug from "../models/Bug.model.js";
import User from "../models/User.model.js";
import { generateCode } from "../utils/codeGenerator.js";
import { successResponse, errorResponse } from "../utils/response.dto.js";

/* ================= SUBMIT SOLUTION ================= */

export const submitSolution = async (req, res) => {
  try {
    const { bugCode, description } = req.body;

    // 1️⃣ Validate bug
    const bug = await Bug.findOne({ bugCode });
    if (!bug) {
      return errorResponse(res, "Bug not found", 404);
    }

    if (bug.status === "Closed") {
      return errorResponse(res, "Bug is already closed", 400);
    }

    // 2️⃣ Prevent duplicate submission by same user
    const existingSubmission = await Submission.findOne({
      bugCode,
      submittedBy: req.user.userCode,
    });

    if (existingSubmission) {
      return errorResponse(res, "You have already submitted a solution", 400);
    }

    const submissionCode = await generateCode(Submission, "SUB");

    // 3️⃣ Handle attachments (Cloudinary)
    const attachments = (req.files || []).map((file) => {
      const mimeType = file.mimetype;

      const type = mimeType.startsWith("image/") ? "image" : mimeType.startsWith("video/") ? "video" : "raw"; // pdf, zip, docs

      return {
        url: file.path, // ✅ Cloudinary full URL
        type,
        name: file.originalname,
      };
    });

    // 4️⃣ Create submission
    const submission = await Submission.create({
      submissionCode,
      bugCode,
      submittedBy: req.user.userCode,
      description,
      attachments,
    });

    // 5️⃣ Move bug to "In Review" (first submission only)
    if (bug.status === "Open") {
      bug.status = "In Review";
      await bug.save();
    }

    return successResponse(res, "Solution submitted", submission, 201);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

/* ================= APPROVE SUBMISSION ================= */

export const approveSubmission = async (req, res) => {
  try {
    const { submissionCode } = req.params;

    const submission = await Submission.findOne({ submissionCode });
    if (!submission) {
      return errorResponse(res, "Submission not found", 404);
    }

    const bug = await Bug.findOne({ bugCode: submission.bugCode });
    if (!bug) {
      return errorResponse(res, "Bug not found for this submission", 404);
    }

    // Only bug creator can approve
    if (bug.createdBy !== req.user.userCode) {
      return errorResponse(res, "Not allowed", 403);
    }

    submission.approved = true;
    await submission.save();

    bug.status = "Closed";
    bug.winner = submission.submittedBy;
    await bug.save();

    await User.findOneAndUpdate({ userCode: submission.submittedBy }, { $inc: { totalEarnings: bug.bounty } });

    return successResponse(res, "Winner approved");
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

/* ================= GET SUBMISSIONS BY BUG ================= */

export const getSubmissionsByBug = async (req, res) => {
  try {
    const { bugCode } = req.params;

    const submissions = await Submission.find({ bugCode });
    // collect userCodes
    const userCodes = submissions.map((s) => s.submittedBy);

    const users = await User.find({ userCode: { $in: userCodes } }, { userCode: 1, name: 1, _id: 0 });

    const userMap = {};
    users.forEach((u) => {
      userMap[u.userCode] = u;
    });

    // enrich submissions
    const response = submissions.map((s) => ({
      ...s.toObject(),
      submittedBy: userMap[s.submittedBy] || {
        userCode: s.submittedBy,
        name: "Unknown",
      },
    }));

    return successResponse(res, "Submissions fetched", submissions);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};
