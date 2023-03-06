import mongoose from "mongoose";
import Task from "./Task.js";

const ContactInfoSchema = new mongoose.Schema({
  company: String,
  name: String,
  responsibility: String,
  contactNumber: String,
});

const ProjectsSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [30, "Title text cannot over 30"],
    required: [true, "Please provide title"],
  },
  description: {
    type: String,
    min: [8, "Description cannot less than 8"],
    max: [100, "Description cannot over 100"],
    required: [true, "Please provide description"],
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    country: { type: String, required: true },
  },
  startDate: {
    type: Date,
    required: [true, "Please provide start date"],
  },
  status: {
    type: String,
    default: "initiating",
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  tags: {
    type: Array,
    default: [],
  },
  businessOwner: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  staff: {
    type: Array,
    default: [],
  },
  contactInfo: [
    {
      type: ContactInfoSchema,
    },
  ],
  phase: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],
  currentPhase: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    // index 的使用？以後要查找可以方便搜尋 2023/2/20 待解決
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// add pre hook to delete related task
ProjectsSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Task.deleteMany({ projectId: this._id });
    next();
  }
);

const Projects = mongoose.model("Projects", ProjectsSchema);
export default Projects;
