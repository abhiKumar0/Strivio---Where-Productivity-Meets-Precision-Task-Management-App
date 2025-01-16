import { Task } from "../models/task.models.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";


const createTask = AsyncHandler(async (req, res) => {
    const {title, description, priority, deadline, assignedTo} = req.body;
    const createdBy = req.user._id;

    if ([title, description, priority, deadline, assignedTo].includes(undefined)) {
        throw new Error("Please provide all required fields");
    }

    const allowedPriorities = ["low", "medium", "high"];
    if (!allowedPriorities.includes(priority.toLowerCase())) {
        throw new ApiError(400, "Priority must be 'low', 'medium', or 'high'");
    }

    if (isNaN(new Date(deadline)) || new Date(deadline) < new Date()) {
        throw new ApiError(400, "Please provide a valid future deadline date");
    }

    const assignedUser = await User.findById(assignedTo);
    
    if (!assignedUser) {
        throw new ApiError(404, "Assigned user not found");
    }

    const task = await Task.create({
        title,
        description,
        priority: priority.toLowerCase(),
        deadline,
        assignedTo,
        createdBy
    });

    const createdTask = await Task.findById(task._id).populate("createdBy", "fullName username role avatar").populate("assignedTo", "fullName username role avatar");
    
    return res.status(200).json(new ApiResponse(200, createdTask, "Task created successfully"));
})

const getTasks = AsyncHandler(async (req, res) => {
    const {priority, status, assignedTo, createdBy } = req.query;
    const filter = {};
    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    if (assignedTo) {
        filter.assignedTo = assignedTo;
    }

    if (createdBy) {
        filter.createdBy = createdBy;
    }
    const tasks = await Task.find(filter).populate("createdBy", "fullName username role avatar").populate("assignedTo", "fullName username role avatar");
    return res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
})

const getTaskDetails = AsyncHandler(async (req, res) => {
    const {taskId} = req.params;
    
    if (!taskId) {
        throw new ApiError(400, "Please provide a task ID");
    }

    const task = await Task.findById(taskId).populate("createdBy", "fullName username role avatar").populate("assignedTo", "fullName username role avatar");

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));
})

const updateTask = AsyncHandler(async (req, res) => {
    const {taskId} = req.params;
    const {title, description, priority, deadline, assignedTo, status} = req.body;
    const updatedFields = {};

    if (title) {
        updatedFields.title = title;
    }

    if (description) {
        updatedFields.description = description;
    }

    if (priority) {
        updatedFields.priority = priority;
    }

    if (deadline) {
        updatedFields.deadline = deadline;
    }

    if (assignedTo) {
        updatedFields.assignedTo = assignedTo;
    }

    if (status) {
        updatedFields.status = status;
    }

    const task = await Task.findByIdAndUpdate(taskId, {$set: updatedFields}, {new: true}).populate("createdBy", "fullName username role avatar").populate("assignedTo", "fullName username role avatar");

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
})

const deleteTask = AsyncHandler(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(400, "Please provide a task ID");
    }

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully"));

})


export {
    createTask,
    getTasks,
    getTaskDetails,
    updateTask,
    deleteTask
}