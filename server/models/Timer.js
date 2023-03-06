import mongoose from "mongoose";

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
  weekStartDate: {
    type: Date,
    required: true,
  },
  weekEndDate: {
    type: Date,
    required: true,
  },
  weekTimeRecord: {
    type: [
      {
        dayOfWeek: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        start_time: {
          type: Date,
          default: "",
        },
        end_time: {
          type: Date,
          default: "",
        },
        duration: { type: Number, default: 0 }, // seconds
        previousDuration: { type: Number, default: 0 },
        recordedDuration: { type: Number, default: 0 },
        stopwatchActive: { type: Boolean, default: false },
      },
    ],
    required: true,
  },
});

const Timer = mongoose.model("Timer", TimerSchema);
export default Timer;

/* 利用秒數來儲存時間，
如果使用者一個小時都沒按下暫停鍵，則會跳出彈窗，詢問是否繼續計時 */

// 創建或是更新 timer
// 當使用者按下計時按鈕，則創建一個新的 timer
