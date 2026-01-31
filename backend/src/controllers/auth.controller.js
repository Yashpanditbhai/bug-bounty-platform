import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/response.dto.js";
import { generateCode } from "../utils/codeGenerator.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists", 400);
    }
    const userCode = await generateCode(User, "USR");
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ userCode, name, email, password: hash });

    return successResponse(res, "User registered successfully", user, 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return errorResponse(res, "Invalid credentials", 400);

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", 400);

    const token = jwt.sign({ userCode: user.userCode }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return successResponse(res, "Login successful", { token });
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

// export const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return errorResponse(res, "Invalid credentials", 400);
//     }

//     const isMatch = await bcrypt.compare(req.body.password, user.password);

//     if (!isMatch) {
//       return errorResponse(res, "Invalid credentials", 400);
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     return successResponse(res, "Login successful", { token });
//   } catch (error) {
//     return errorResponse(res, error.message);
//   }
// };
