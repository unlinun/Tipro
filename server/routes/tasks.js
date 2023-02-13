import express from "express";
import { getAllTask, createTask } from "../controller/task.js";

const router = express.Router();

router.route("/").get(getAllTask).post(createTask);

export default router;
