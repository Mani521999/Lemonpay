/** Package */
import mongoose from "mongoose";

/** Models */
import UserTable from "../../Module/User/Models/users";

/** Library */
import { isEmpty, sendResponse } from "../../Services/library";

/** Verify auth token */
export const verifyToken = async (req, res, next) => {
  try {
    console.log("verifyTokenverifyTokenverifyTokenreq", req.url);
    const token = req.header("Authorization")?.split("Bearer ")?.join("");
    console.log("verifyTokenverifyTokenverifyTokenreq", token);

    let decoding = new UserTable().decodejwt(token);
    console.log(decoding, "decoding");

    let userDoc = await UserTable.findOne({ _id: decoding.userId }); //deoding._id is null
        console.log("verifyTokenverifyTokenverifyTokenreq", userDoc);

    if (isEmpty(userDoc)) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Invalid Token",
      });
    } 
    let data = { id: userDoc._id, email: userDoc.email };
    req.user = data;
    return next();
  } catch (err) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message:
        "Authentication failed. Your token is invalid or has expired. Please log in again.",
    });
  }
};
