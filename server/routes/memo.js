import express from "express";
import {
  getAllMemo,
  getSingleMemo,
  createMemo,
  updateSingleMemo,
  deleteSingleMemo,
} from "../controller/memo.js";

const router = express.Router();

router.route("/").get(getAllMemo).post(createMemo);
router
  .route("/:id")
  .get(getSingleMemo)
  .patch(updateSingleMemo)
  .delete(deleteSingleMemo);

export default router;
