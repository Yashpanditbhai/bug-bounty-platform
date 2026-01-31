import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const mimeType = file.mimetype;

    const resource_type = mimeType.startsWith("image/") ? "image" : mimeType.startsWith("video/") ? "video" : "raw";

    return {
      folder: "bug-bounty",
      resource_type,
      use_filename: true, // ✅ keep original filename
      unique_filename: true, // avoid collisions
    };
  },
});

export const upload = multer({ storage });
