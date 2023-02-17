import express from "express";
import { createPhase, getSinglePhase } from "../controller/phase.js";

const router = express.Router();

router.route("/").post(createPhase);
router.route("/:id").get(getSinglePhase);

export default router;
