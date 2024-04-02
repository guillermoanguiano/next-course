import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
}

export const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
