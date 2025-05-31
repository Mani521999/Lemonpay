/* Packages */
import express from "express";

/** Global-Usage */
const router = express();

/** Services */
import * as UserController from '../Controllers/userController';


/** Validations */
import { loginValidation, registerValidation } from "../../../Middleware/Validations/userValidation";

router.route("/userRegistration").post(registerValidation, UserController.userRegistration)
router.route("/userLogin").post(loginValidation, UserController.userLogin)


module.exports = router;