import express from "express";
import { getTimerFromTask, createTimer } from "../controller/timer.js";

const router = express.Router();

router.route("/").post(createTimer);
router.route("/id").get(getTimerFromTask);

export default router;
