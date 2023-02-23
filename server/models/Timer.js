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

/* 利用秒數來儲存時間，
如果使用者一個小時都沒按下暫停鍵，則會跳出彈窗，詢問是否繼續計時 */
