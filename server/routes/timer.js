import express from "express";
import { getTimer, createTimer, updateTimer } from "../controller/timer.js";

const router = express.Router();

router.route("/").get(getTimer).post(createTimer);
router.route("/:id").patch(updateTimer);

export default router;
