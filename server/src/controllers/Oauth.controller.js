import { User } from "../models/user.models.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { OPTIONS } from "../constants.js";
import passport from "passport";


const googleLogin = passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
})

const googleLoginCallback = (req, res, next) => {
    passport.authenticate("google", {session: false}, (err, data) => {
        try {

            if (err || !data) {
                
                throw next(new ApiError(401, "Authentication failed"));
            }
            const {user, accessToken, refreshToken} = data;
            return res.status(200).cookie("accessToken", accessToken, OPTIONS).cookie("refreshToken", refreshToken).json(new ApiResponse(200, {user, refreshToken, accessToken}, "Login with google is successful"))
        } catch (error) {
            throw new ApiError(500, error?.message || "Error occured while loging with google")
        }
    })(req, res, next);
}

export { googleLogin, googleLoginCallback };