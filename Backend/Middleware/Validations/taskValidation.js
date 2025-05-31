import Joi from "joi";
import { sendResponse } from "../../Services/library";

export const taskValidation = async (req, res, next) => {
  try {
    let schema = Joi.object({
      taskName: Joi.string().required().messages({
        "string.empty": "Task name is required",
      }),
      dueDate: Joi.date().greater("now").required().messages({
        "date.base": "Due date must be a valid date",
        "date.greater": "Due date must be in the future",
        "any.required": "Due date is required",
      }),
    }).unknown(true);

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    console.log("errorerror:", JSON.stringify(error, null, 2), value);

    if (error) {
      const errors = {};
      for (let i = 0; i < error.details.length; i++) {
        const data = error.details[i];
        errors[data.context.label] = data.message;
      }

      console.log("error", errors);

      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "validation error ",
        errors,
      });
    }
    next();
  } catch (e) {
    console.log("taskValidation_err", e);
    return sendResponse(res, {
      success: false,
      message: "Error on server",
      errors: {},
      statusCode: 500,
    });
  }
};

export const editTaskValidation = async (req, res, next) => {
  try {
    let schema = Joi.object({
      _id: Joi.string().required().messages({
        "string.empty": "ID is required",
        "any.required": "ID is required",
      }),
      taskName: Joi.string().required().messages({
        "string.empty": "Email is required",
      }),
      dueDate: Joi.date().greater("now").required().messages({
        "date.base": "Due date must be a valid date",
        "date.greater": "Due date must be in the future",
        "any.required": "Due date is required",
      }),
    }).unknown(true);

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    console.log("errorerror:", JSON.stringify(error, null, 2), value);

    if (error) {
      const errors = {};
      for (let i = 0; i < error.details.length; i++) {
        const data = error.details[i];
        errors[data.context.label] = data.message;
      }

      console.log("error", errors);

      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "validation error ",
        errors,
      });
    }
    next();
  } catch (e) {
    console.log("editTaskValidation_err", e);
    return sendResponse(res, {
      success: false,
      message: "Error on server",
      errors: {},
      statusCode: 500,
    });
  }
};

export const deleteTaskValidation = async (req, res, next) => {
  try {
    let schema = Joi.object({
      _id: Joi.string().required().messages({
        "string.empty": "ID is required",
        "any.required": "ID is required",
      }),
    }).unknown(true);

    const { error, value } = schema.validate(req.query, { abortEarly: false });
    console.log("errorerror:",req.query, JSON.stringify(error, null, 2), value);

    if (error) {
      const errors = {};
      for (let i = 0; i < error.details.length; i++) {
        const data = error.details[i];
        errors[data.context.label] = data.message;
      }
      console.log("error", errors);

      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "validation error ",
        errors,
      });
    }
    next();
  } catch (e) {
    console.log("deleteTaskValidation_err", e);
    return sendResponse(res, {
      success: false,
      message: "Error on server",
      errors: {},
      statusCode: 500,
    });
  }
};
