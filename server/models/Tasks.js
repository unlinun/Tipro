import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [30, "Title cannot over 30"],
    required: [true, "Please provide title"],
  },
  startDate: {
    type: String,
    required: [true, "Please provide start date"],
  },
  dueDate: {
    type: String,
    required: [true, "please provide due date"],
  },
  tags: {
    type: Array,
    default: [],
  },
  finished: {
    type: Boolean,
    default: false,
  },
  timers: {
    type: Array,
    default: [],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  phaseId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", TasksSchema);
export default Tasks;
