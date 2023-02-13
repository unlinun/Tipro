import { StatusCodes } from "http-status-codes";
import Tasks from "../models/Tasks.js";

export const getAllTask = async (req, res) => {
  console.log(req);
};

export const createTask = async (req, res) => {
  const user = req.user;
  const task = { ...req.body, createdBy: user.userID };
};
