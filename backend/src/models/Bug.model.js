import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
  bugCode: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  bounty: { type: Number, required: true },

  attachments: [
    {
      url: { type: String },
      type: { type: String },
      name: { type: String },
    },
  ],

  status: {
    type: String,
    enum: ["Open", "In Review", "Closed"],
    default: "Open",
  },

  createdBy: { type: String },
  winner: { type: String },
});

export default mongoose.model("Bug", bugSchema);
