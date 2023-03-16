import mongoose from "mongoose";
import Task from "./Task.js";

const TimerSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  phaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  startDate: {
    type: Date,
    default: "",
  },
  endDate: {
    type: Date,
    default: "",
  },
  timeRecord: [
    {
      dateOfWeek: {
        type: Date,
        default: "",
      },
      duration: { type: Number, default: 0 }, // seconds
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Add a unique index on the taskId field to prevent duplicates
TimerSchema.index({ taskId: 1 }, { unique: true });

const Timer = mongoose.model("Timer", TimerSchema);
export default Timer;
