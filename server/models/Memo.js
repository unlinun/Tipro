import mongoose from "mongoose";

const MemoSchema = mongoose.Schema({
  content: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Memo = mongoose.model("Memo", MemoSchema);
export default Memo;
