import mongoose, {Schema} from "mongoose";


const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    deadline: {
        type: Date,
        required: [true, "Please provide a deadline"]
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    attachment: [String],
    comments: [
        {
            comment: {
                type: String,
                required: [true, "Please provide a comment"],
                trim: true
            },
            commentedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ]
}, {
    timestamps: true
})

export const Task = mongoose.model("Task", taskSchema);