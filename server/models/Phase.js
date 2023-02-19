import mongoose from "mongoose";

const singlePhaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const PhaseSchema = new mongoose.Schema({
  allPhase: [{ type: singlePhaseSchema }],
});

const Phase = mongoose.model("Phase", PhaseSchema);
export default Phase;
