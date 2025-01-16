import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { createTask, deleteTask, getTaskDetails, getTasks, updateTask } from "../controllers/task.controller.js";
import { canUpdate } from "../middlewares/canUpdate.middleware.js";
import { addComment, getTaskComments } from "../controllers/comment.controller.js";

const router = Router();


//Using middleware
router.route("/create").post(verifyJWT, verifyRole("admin"), createTask);
router.route("/").get(getTasks);
router.route("/:taskId").get(getTaskDetails);
router.route("/:taskId").patch(verifyJWT, canUpdate, updateTask);
router.route("/:taskId").delete(verifyJWT, canUpdate, deleteTask);


//Comments
router.route("/:taskId/comments").post(addComment);
router.route("/:taskId/comments").get(getTaskComments);




export default router