import express from "express";
import { getStaffs } from "../controller/company.js";

const router = express.Router();

router.route("/").get(getStaffs);

export default router;
