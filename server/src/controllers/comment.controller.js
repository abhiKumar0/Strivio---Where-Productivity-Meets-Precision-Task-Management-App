import { Task } from "../models/task.models.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const addComment = AsyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const user = req.user;
    
});

const getTaskComments = AsyncHandler(async (req, res) => {
})

export {
    addComment,
    getTaskComments
}