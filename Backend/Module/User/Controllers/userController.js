/** Packages */
import mongoose, { isValidObjectId } from "mongoose";

/** Models */
import UserTable from "../Models/users";

/** Library */
import { isEmpty, sendResponse } from "../../../Services/library";

/**
 * Method : POST
 * URL : /userKYCVerification
 * @param {email, password} req
 * @param {*} res
 */
export const userRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("userRegistration", req.body);

    const checkUser = await UserTable.findOne({ $or: [{ email: email }] });
    if (!isEmpty(checkUser)) {
      return sendResponse(res, {
        success: false,
        errors: { email: "Email already exists. Please try a different one" },
        message: "",
        statusCode: 400,
      });
    }

    const user = new UserTable({ email, password: password });
    await user.save();

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Your account has been registered successfully.",
    });
  } catch (e) {
    console.log("userRegistration_err", e);
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
 * URL : /userLogin
 * @param {email, password} req
 * @param {*} res
 */
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserTable.findOne({ email: email });
    if (isEmpty(user)) {
      return sendResponse(res, {
        success: false,
        errors: { email: "Email not found. Please check and try again" },
        message: "",
        statusCode: 400,
      });
    }

    const checkPassword = await user.authenticate(password);
    if (!checkPassword) {
      return sendResponse(res, {
        success: false,
        errors: {
          password:
            "The password is incorrect. Please verify and enter the correct password",
        },
        message: "",
        statusCode: 400,
      });
    }
    /** JWT-TOKEN-GENERATE */
    let payload = { userId: user._id, email: user.email };
    let token = new UserTable().generateJWT(payload); // JWT

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (e) {
    console.log("userLogin_err", e);
    return sendResponse(res, {
      success: false,
      message: "Something went wrong",
      errors: {},
      statusCode: 500,
    });
  }
};
