import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [30, "Title cannot over 30"],
    required: [true, "Please provide title"],
  },
  startDate: {
    type: String,
    required: [true, "Please provide start date"],
  },
  tags: {
    type: Array,
    default: [],
  },
  timer: {
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
    ref: "Project",
    required: true,
  },
  phaseId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;

/* TASK 裡面會有 timer,
每一個task裡面會有多個timer（因為每天工作 8小時算，過了一天，就會產生一個新的 timer 直到 task 完成）
每一個task會有所有timer相加的時間
每一個timer會有一個對應的日期，
每一個timer會有一個duration(已經加總過後的)，
還會有一個currentDuration, 以免使用者跳出去之後所儲存的資料消失。
使用者要可以修改每一天的 duration ,還要可以讓 task 的 totalDuration 相加

要思考一下如何將正在計算的時間一直保持（是否使用update? 但就會每一秒都更新）
是否將 timer 另外拉出來成為一個新的 model，這樣在更新時才不會耗費太久的效能？


思考：如果 task 沒有完成，是否直接延續到下一天（在網站上會看見該 task 資訊)
startDate 如果開始了，都沒有完成，要如何延續到下一天？

測試，先將timer獨立拉出來，利用 taskId 以及 createdTime來搜查
前端先行阻擋，如果 createdAt 一樣的話就不會新增一個新的時間段，而是更新時間，
因為一個 task 中的 timer 不會有兩個一樣的創建時間
*/
