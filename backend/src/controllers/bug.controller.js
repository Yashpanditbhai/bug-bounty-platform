import Bug from "../models/Bug.model.js";
import { generateCode } from "../utils/codeGenerator.js";
import { successResponse, errorResponse } from "../utils/response.dto.js";
import User from "../models/User.model.js";
import Submission from "../models/Submission.model.js";

export const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();

    // fetch creators
    const users = await User.find(
      { userCode: { $in: bugs.map((b) => b.createdBy) } },
      { userCode: 1, name: 1, _id: 0 },
    );

    const userMap = {};
    users.forEach((u) => {
      userMap[u.userCode] = u;
    });

    // 🔥 fetch submission counts
    const submissionCounts = await Submission.aggregate([
      {
        $group: {
          _id: "$bugCode",
          count: { $sum: 1 },
        },
      },
    ]);

    const submissionCountMap = {};
    submissionCounts.forEach((s) => {
      submissionCountMap[s._id] = s.count;
    });

    const response = bugs.map((bug) => ({
      ...bug.toObject(),
      createdBy: userMap[bug.createdBy] || null,
      submissionsCount: submissionCountMap[bug.bugCode] || 0,
    }));

    return successResponse(res, "Bugs fetched", response);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const createBug = async (req, res) => {
  try {
    const bugCode = await generateCode(Bug, "BUG");

    // Correct attachment handling (image / video / pdf / zip)
    const attachments = (req.files || []).map((file) => {
      const mimeType = file.mimetype;
      console.log("mime-type", mimeType);
      const type = mimeType.startsWith("image/") ? "image" : mimeType.startsWith("video/") ? "video" : "raw"; // pdf, zip, docs

      return {
        url: file.path, // ✅ Cloudinary full URL
        type,
        name: file.originalname,
      };
    });

    const bug = await Bug.create({
      bugCode,
      title: req.body.title,
      description: req.body.description,
      bounty: req.body.bounty,
      attachments,
      createdBy: req.user.userCode,
    });

    return successResponse(res, "Bug created", bug, 201);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const getBugByCode = async (req, res) => {
  try {
    const { bugCode } = req.params;

    const bug = await Bug.findOne({ bugCode });
    if (!bug) {
      return errorResponse(res, "Bug not found", 404);
    }

    const user = await User.findOne({ userCode: bug.createdBy }, { userCode: 1, name: 1, _id: 0 });

    const response = {
      ...bug.toObject(),
      createdBy: user || null,
    };

    return successResponse(res, "Bug fetched", response);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const updateBugStatus = async (req, res) => {
  try {
    const { bugCode } = req.params;
    const { status } = req.body;

    const bug = await Bug.findOne({ bugCode });
    if (!bug) return errorResponse(res, "Bug not found", 404);

    if (bug.createdBy !== req.user.userCode) {
      return errorResponse(res, "Not allowed", 403);
    }

    bug.status = status; // Open | In Review | Closed
    await bug.save();

    return successResponse(res, "Bug status updated", bug);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};
