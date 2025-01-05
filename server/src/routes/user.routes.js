import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { login, register } from "../controllers/user.controller.js";

const router = Router();


//Using middleware
router.route("/register").post(register)
router.route("/login").post(login)



export default router