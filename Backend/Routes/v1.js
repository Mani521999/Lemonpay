/*PACKAGE */
import express from "express";


/** Global-Usage */
const router = express();


/** Routes */
import userRoutes from "../Module/User/Route/usersRoute";

router.use("/v1/user", userRoutes);



module.exports = router;