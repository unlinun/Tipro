import express from "express";
import { register, login } from "../controller/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/").post(login);

export default router;
