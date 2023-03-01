import express from "express";
import { getProjectStaffs, getAllStaffs } from "../controller/company.js";

const router = express.Router();

router.route("/").get(getProjectStaffs);
router.route("/:id").get(getAllStaffs);

export default router;
