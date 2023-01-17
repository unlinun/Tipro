import express from "express";
import {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/projects.js";

const router = express.Router();

router.route("/").get(getAllProjects).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);

export default router;
