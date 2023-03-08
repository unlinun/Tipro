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
  timeRecord: {
    type: [
      {
        weekStartDate: {
          type: Date,
          required: true,
          default: getWeekStartDate(new Date()),
        },
        record: [
          {
            dayOfWeek: {
              type: String,
              enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            dateOfWeek: {
              type: Date,
              default: "",
            },
            duration: { type: Number, default: 0 }, // seconds
          },
        ],
      },
    ],
    default: generateTimerDefault(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Add a unique index on the taskId field to prevent duplicates
TimerSchema.index({ taskId: 1 }, { unique: true });

function generateTimerDefault() {
  const weekDate = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = getWeekStartDate(new Date());
  const endDate = getWeekEndDate(new Date());
  const weekDates = [];
  for (
    let day = new Date(startDate);
    day < endDate;
    day.setDate(day.getDate() + 1)
  ) {
    weekDates.push({
      dayOfWeek: weekDate[day.getDay()],
      dateOfWeek: new Date(day),
      duration: 0,
    });
  }
  return {
    weekStartDate: startDate,
    record: weekDates,
  };
}

//  在每個禮拜的第一天 自動創建新的 time sheet
// 涉及到整體的查詢，則應該使用靜態方法。簡單來說，通常靜態方法會涉及到查詢、新增、修改、刪除。
TimerSchema.statics.createTimerForNewWeek = async function () {
  const weekStartDate = getWeekStartDate(new Date());
  const tasks = await Task.find({ finished: false });
  // loop tasks，找到有符合的 timer

  for (const task of incompleteTasks) {
    const existingTimer = await Timer.findOne({
      taskId: task._id,
      "timeRecord.weekStartDate": { $gte: weekStartDate },
    });

    if (!existingTimer) {
      const newTimer = new Timer({
        projectId: task.projectId,
        taskId: task._id,
        phaseId: task.phaseId,
        timeRecord: generateTimer(),
      });
      await newTimer.save();
    }
  }
};

const Timer = mongoose.model("Timer", TimerSchema);
export default Timer;

/* 利用秒數來儲存時間，
如果使用者一個小時都沒按下暫停鍵，則會跳出彈窗，詢問是否繼續計時 */

// 創建或是更新 timer
// 當使用者按下計時按鈕，則創建一個新的 timer

// helper function to get week start date
function getWeekStartDate(date) {
  const dayOfWeek = date.getDay();
  const day = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const firstDay = new Date(date.setDate(day));
  firstDay.setUTCHours(0, 0, 0, 0);
  // 回傳的是午夜
  return firstDay;
}

// helper function to get week end date
function getWeekEndDate(weekStartDate) {
  let weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  weekEndDate.setUTCHours(0, 0, 0, 0);
  return weekEndDate;
}
