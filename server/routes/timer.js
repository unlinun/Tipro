import express from "express";
import { getTimer, createTimer } from "../controller/timer.js";

const router = express.Router();

router.route("/").get(getTimer).post(createTimer);
// router.route("/id").get(getTimer);

export default router;
