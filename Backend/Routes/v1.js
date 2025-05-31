/*PACKAGE */
import express from "express";


/** Global-Usage */
const router = express();


/** Routes */
import userRoutes from "../Module/User/Route/usersRoute";
import taskRoutes from "../Module/Task/Route/taskRoute";

router.use("/v1/user", userRoutes);
router.use("/v1/task", taskRoutes);



module.exports = router;