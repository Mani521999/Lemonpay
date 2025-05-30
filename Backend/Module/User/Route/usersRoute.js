/* Packages */
import express from "express";

/** Global-Usage */
const router = express();

/** Services */
import * as UserController from '../Controllers/userController';

/** Middleware */
import { verifyToken } from "../../../Middleware/Authendicate/authendication";

/** Validations */
import { registerValidation } from "../../../Middleware/Validations/userValidation";

router.route("/userRegistration").post(registerValidation, UserController.userRegistration)
router.route("/userLogin").post(registerValidation, UserController.userLogin)


module.exports = router;