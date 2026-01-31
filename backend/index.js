import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});


import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initCloudinary } from "./src/config/cloudinary.js";

initCloudinary(); // 🔥 MUST be before routes are used

connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
