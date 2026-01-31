import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   userCode: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  totalEarnings: { type: Number, default: 0 }
});

export default mongoose.model("User", userSchema);
