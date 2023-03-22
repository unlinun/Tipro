import mongoose from "mongoose";
import Timer from "./Timer.js";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [30, "Title cannot over 30"],
    required: [true, "Please provide title"],
  },
  startDate: {
    type: Date,
    required: [true, "Please provide start date"],
  },
  endDate: {
    type: Date,
    default: "",
  },
  tags: {
    type: Array,
    default: [],
  },
  finished: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  phaseId: {
    type: mongoose.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// 預先 pre-save hook to create timesheet document when a new task is created
// pre-save hook是Mongoose中的一個middleware，它在執行保存操作之前執行

// 在創建 task 後，直接創建一個 timer
// 創建預設的 timeRecord (empty array)
// 使用 pre-save hook
TaskSchema.pre("save", async function (next) {
  const task = this;
  try {
    // create timer document
    const timer = new Timer({
      taskId: this._id,
      projectId: task.projectId,
      phaseId: task.phaseId,
      startDate: task.startDate,
      endDate: null,
      timeRecord: [],
      createdBy: this.createdBy,
    });
    // save timer document
    await timer.save();
  } catch (error) {
    throw new Error(error.message);
  }

  next();
});
// 當更新 Task 的 startDate, 也要同步更新 Timer 的起始記錄時間
TaskSchema.pre("findOneAndUpdate", async function (next) {
  // 取得正在更新的 task._id
  try {
    const task = await Task.findOne(this.getQuery());
    const endDate = task.endDate;
    const timer = await Timer.findOne({ taskId: task._id });
    timer.endDate = endDate;
    timer.phaseId = task.phaseId;
    await timer.save();
  } catch (error) {
    throw new Error(error.message);
  }
  next();
});

// 預先 pre-remove hook !!!
// pre-remove hook ，可以在刪除 task 時，一併刪除有關連的 timer data!!
TaskSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Timer.deleteMany({ taskId: this._id });
    next();
  }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;

//  紀錄一些想法
/* TASK 裡面會有 timer,
如何在創建 task 時一併創建 timer?
每一個timer 裡面會有多個 timeRecord
每一個task會有所有timer相加的時間
每一個timer會有一個對應的日期，
每一個timer會有一個duration(已經加總過後的)，
還會有一個previousDuration, 以免使用者跳出去之後所儲存的資料消失。
使用者要可以修改每一天的 duration ,還要可以讓 task 的 totalDuration 相加

要思考一下如何將正在計算的時間一直保持（是否使用update? 但就會每一秒都更新）
是否將 timer 另外拉出來成為一個新的 model，這樣在更新時才不會耗費太久的效能？


思考：如果 task 沒有完成，是否直接延續到下一天（在網站上會看見該 task 資訊)
startDate 如果開始了，都沒有完成，要如何延續到下一天？

測試，先將timer獨立拉出來，利用 taskId 以及 createdTime來搜查
前端先行阻擋，如果 createdAt 一樣的話就不會新增一個新的時間段，而是更新時間，
因為一個 task 中的 timer 不會有兩個一樣的創建時間
*/
