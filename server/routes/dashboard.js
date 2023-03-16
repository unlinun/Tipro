import express from "express";
import { getDashboard } from "../controller/dashboard.js";

const router = express.Router();

router.route("/").get(getDashboard);

export default router;
