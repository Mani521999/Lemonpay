/** Packages */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

/** Services */
import config from "../../../Config/config";

/** Global-Usage */
const Schema = mongoose.Schema;

/** Login-History */
const TaskSchema = new Schema(
  {
    taskName: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", TaskSchema, "task");

export default Task;
