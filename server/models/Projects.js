import mongoose from "mongoose";

const ContactInfoSchema = new mongoose.Schema({
  company: String,
  name: String,
  responsibility: String,
  contactNumber: String,
});

const PhaseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, "Phase title cannot repeat"], //是否唯一？
    required: true,
    max: 15,
  },
  duration: {
    type: Number,
    default: 0,
  },
  tasks: {
    type: Array,
    default: [],
  },
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
  phase: {
    currentPhase: {
      type: String,
      required: true,
    },
    allPhase: [
      {
        type: PhaseSchema,
        required: true,
      },
    ],
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Projects = mongoose.model("Projects", ProjectsSchema);
export default Projects;
