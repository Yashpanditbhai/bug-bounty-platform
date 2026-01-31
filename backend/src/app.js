
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import bugRoutes from "./routes/bug.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api/submissions", submissionRoutes);

export default app;
