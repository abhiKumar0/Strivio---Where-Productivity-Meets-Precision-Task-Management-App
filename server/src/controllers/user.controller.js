import { User } from "../models/user.models.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { OPTIONS } from "../constants.js";


const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  if (!users) {
    throw new ApiError(404, "Users not found");
  }


  return res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
})

const updateUserRole = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  if (!userId || !role) {
    throw new ApiError(400, "User id and role are required");
  }

  if (!["admin", "member", "leader"].includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = role;
  await user.save();

  return res.status(200).json(new ApiResponse(200, user, "User role updated successfully"));
})

const getUser = AsyncHandler(async (req, res) => {
  const {userId} = req.params;
  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
})

export {
    getUsers,
    updateUserRole,
    getUser
}