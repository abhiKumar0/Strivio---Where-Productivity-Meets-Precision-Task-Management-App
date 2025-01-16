import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";


export const verifyRole = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            throw new ApiError(403, "Unauthorize");
        }
        if (!role.includes(user.role)) {
            throw new ApiError(403, "Permission denied, Only admin can access this route");
        }
        next();
    }
}