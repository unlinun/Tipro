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
    required: true,
    max: 15,
  },
  dueDate: {
    type: Date,
  },
  duration: {
    type: Number,
    default: 0,
  },
  isCurrentPhase: {
    type: Boolean,
    required: true,
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
    enum: ["initiating", "in progress", "canceled", "finished"],
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
  managers: {
    type: Array,
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
      type: PhaseSchema,
      required: true,
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Projects = mongoose.model("Projects", ProjectsSchema);
export default Projects;
