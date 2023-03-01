import express from "express";
import { getUser, updateUser, getStaffs } from "../controller/user.js";

const router = express.Router();
router.route("/").get(getStaffs);
router.route("/:id").get(getUser);

export default router;
