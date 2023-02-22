import mongoose from "mongoose";

const TimerSchema = new mongoose.Schema({
  currentDuration: {
    type: Number,
    default: 0,
    required: true,
  },
  totalDuration: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  taskId: {
    type: mongoose.Types.ObjectId,
    ref: "Tasks",
    required: true,
  },
});

const Timer = mongoose.model("Timer", TimerSchema);
export default Timer;
