import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { currentUser, login, logout, register } from "../controllers/auth.controller.js";
import { googleLogin, googleLoginCallback } from "../controllers/Oauth.controller.js";

const router = Router();


//Using middleware
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/currentUser").get(verifyJWT, currentUser);


// Oauth
router.route("/google").get(googleLogin);
router.route("/google/callback").get(googleLoginCallback);



export default router