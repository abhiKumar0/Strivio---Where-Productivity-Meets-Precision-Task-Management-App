import { Task } from "../models/task.models.js";
import ApiError from "../utils/ApiError.js";



export const canUpdate = async (req, res, next) => {
    return async(req, res, next) => {
        try {
            const {taskId} = req.params;
            const {userId} = req.user;
    
            const task = await Task.findById(taskId);
            if (!task) {
                throw new ApiError(404, "Task not found");
            }
            
            if (task.createdBy.toString() !== userId && task.assignedTo.toString() !== userId) {
                throw new ApiError(403, "You are not allowed to update this task");
            }
    
            next();
        } catch (error) {
            throw new ApiError(500, error.message);
        }
    }
}