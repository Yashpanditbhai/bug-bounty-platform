import mongoose from "mongoose";

// const submissionSchema = new mongoose.Schema({
//   submissionCode: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   bugCode: {
//     type: String,
//     required: true,
//   },
//   submittedBy: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   proof: {
//     type: String,
//     required: true,
//   },
//   approved: {
//     type: Boolean,
//     default: false,
//   },
// });

const submissionSchema = new mongoose.Schema({
  submissionCode: { type: String, unique: true },
  bugCode: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  attachments: [
    {
      url: String,
      type: String,
      name: String,
    },
  ],

  approved: { type: Boolean, default: false },
});

export default mongoose.model("Submission", submissionSchema);
