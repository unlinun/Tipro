import express from "express";
import {
  createPhase,
  deletePhase,
  getSinglePhase,
  updatePhase,
} from "../controller/phase.js";

const router = express.Router();

router.route("/").post(createPhase);
router.route("/:id").get(getSinglePhase).patch(updatePhase).delete(deletePhase);

export default router;
