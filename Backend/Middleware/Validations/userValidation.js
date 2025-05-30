import Joi from "joi";
import { sendResponse } from "../../Services/library";

export const registerValidation = async (req, res, next) => {
  try {
    let schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email is required",
          "string.email": "Enter a valid email address",
        }),
      password: Joi.string()
        .min(6)
        .max(128)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,12}$"
          )
        )
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          "string.empty": "Password is required",
          "string.min": "Password must be at least 6 characters",
          "string.max": "Password cannot exceed 12 characters",
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

      console.log("error", payload);

      return sendResponse(res,{
        statsCode: 400,
        status: false,
        message: "validation error ",
        errors,
      });
    }
    next();
  } catch (e) {
    console.log("registerValidation_err", e);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error on server",
        errors: {},
        statusCode: 500,
      });
  }
};
