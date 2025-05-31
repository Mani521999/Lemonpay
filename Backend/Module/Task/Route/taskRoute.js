/* Packages */
import express from "express";

/** Global-Usage */
const router = express();

/** Services */
import * as TaskController from "../Controllers/taskController";

/** Middleware */
import { verifyToken } from "../../../Middleware/Authendicate/authendication";

/** Validations */
import {
  deleteTaskValidation,
  editTaskValidation,
  taskValidation,
} from "../../../Middleware/Validations/taskValidation";

router
  .route("/createTask")
  .post(verifyToken, taskValidation, TaskController.createTask);
router
  .route("/editTask")
  .post(verifyToken, editTaskValidation, TaskController.editTask);
router
  .route("/getAllTask")
  .get(verifyToken, TaskController.getAllTask);
router
  .route("/deleteTask")
  .post(verifyToken, deleteTaskValidation, TaskController.deleteTask);

module.exports = router;
