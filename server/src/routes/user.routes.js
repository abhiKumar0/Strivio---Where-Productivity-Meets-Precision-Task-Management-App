import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUser, getUsers, updateUserRole } from "../controllers/user.controller.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();


//Using middleware
router.route("/").get(verifyJWT, verifyRole(["admin"]), getUsers);
router.route("/:userId/role").patch(verifyJWT, verifyRole(["admin"]), updateUserRole);
router.route("/:userId").get(verifyJWT, verifyRole(["admin"]), getUser);


export default router