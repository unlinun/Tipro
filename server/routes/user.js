import express from "express";
import { updateUser } from "../controller/user.js";

const router = express.Router();
router.route("/:id").patch(updateUser);

export default router;
