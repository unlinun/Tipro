import express from "express";
import {
  getTimer,
  createTimer,
  updateTimer,
  updateTimerDuration,
  getProjectTimer,
} from "../controller/timer.js";

const router = express.Router();

router.route("/").get(getTimer).post(createTimer).patch(updateTimer);
router.route("/:id").get(getProjectTimer).patch(updateTimerDuration);

export default router;
