import User from "../models/User.model.js";
import { successResponse, errorResponse } from "../utils/response.dto.js";

export const getLoggedInUser = async (req, res) => {
  try {
    // 🔐 Safety check
    if (!req.user || !req.user.userCode) {
      return errorResponse(res, "Unauthorized", 401);
    }

    // if (!req.user || !req.user.userCode) {
    //   return errorResponse(res, "Unauthorized", 401);
    // }

    const user = await User.findOne({ userCode: req.user.userCode }, { password: 0, _id: 0, __v: 0 });

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User profile fetched", user);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};
