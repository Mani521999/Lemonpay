/** Packages */
import mongoose, { isValidObjectId } from "mongoose";

/** Models */
import TaskTable from "../Models/tasks";

/** Library */
import {
  isEmpty,
  paginationQuery,
  sendResponse,
} from "../../../Services/library";

/**
 * Method : POST
 * URL : /createTask
 * @param {taskName, description, dueDate} req
 * @param {*} res
 */
export const createTask = async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;

    await new TaskTable({ taskName, description, dueDate }).save();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Task added successfully.",
    });
  } catch (e) {
    console.log("createTask_err", e);
    return sendResponse(res, {
      success: false,
      message: "Something went wrong",
      errors: {},
      statusCode: 500,
    });
  }
};

/**
 * Method : POST
 * URL : /editTask
 * @param {taskName, description, dueDate, id} req
 * @param {*} res
 */
export const editTask = async (req, res) => {
  try {
    const { taskName, description, dueDate, _id } = req.body;

    const task = await TaskTable.findOne({ _id: _id });
    if (!isEmpty(task)) {
      task.taskName = taskName;
      task.description = description;
      task.dueDate = dueDate;
      await task.save();
      return sendResponse(res, {
        success: true,
        message: "Task updated successfully",
        statusCode: 200,
      });
    }
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Record not found",
    });
  } catch (e) {
    console.log("editTask_err", e);
    return sendResponse(res, {
      success: false,
      message: "Something went wrong",
      errors: {},
      statusCode: 500,
    });
  }
};

/**
 * Method : GET
 * URL : /getAllTask
 * @param {*} req
 * @param {*} res
 */
export const getAllTask = async (req, res) => {
  try {
    const pagiation = paginationQuery(req.query);
    const count = await TaskTable.countDocuments();
    const data = await TaskTable.find({})
      .skip(pagiation.skip)
      .limit(pagiation.limit);
    return sendResponse(res, {
      success: true,
      message: "Task updated successfully",
      statusCode: 200,
      data,
      count,
    });
  } catch (e) {
    console.log("getAllTask_err", e);
    return sendResponse(res, {
      success: false,
      message: "Something went wrong",
      errors: {},
      statusCode: 500,
    });
  }
};

/**
 * Method : GET
 * URL : /deleteTask
 * @param {id} req
 * @param {*} res
 */
export const deleteTask = async (req, res) => {
  try {
    const data = await TaskTable.deleteOne({ _id: req.query._id });
    return sendResponse(res, {
      success: true,
      message: "Task deleted successfully",
      statusCode: 200,
      data,
    });
  } catch (e) {
    console.log("deleteTask_err", e);
    return sendResponse(res, {
      success: false,
      message: "Something went wrong",
      errors: {},
      statusCode: 500,
    });
  }
};
