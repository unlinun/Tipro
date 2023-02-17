import express from "express";
import {
  getAllTasks,
  createTask,
  deleteTask,
  getSingleTask,
  updateTask,
} from "../controller/task.js";

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

export default router;
