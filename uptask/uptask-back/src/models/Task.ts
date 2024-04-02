import mongoose, { Schema, Document, Types } from "mongoose";

// Aquí creamos un enum para las tareas o "Diccionario de datos" para después pasarlo a un type.
const taskStatus = { 
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const;

// Con este type guard le decimos que las tareas solo puedan ser de un estado.
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
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
        // Aquí le decimos que las tareas solo puedan ser de un estado, que es el enum de arriba.
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING,
        }
    },
    { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
