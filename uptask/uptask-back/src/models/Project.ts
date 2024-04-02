import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

// PopulatedDoc lo que hace es traer toda la información de esa tarea como un join de base de datos relaciones y via generic le diremos lo que hace esa tarea.
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[];
}

// Una tarea va a tener un proyecto y un proyecto puede tener muchas tareas
const ProjectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
            trim: true,
        },
        clientName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        tasks: [
            {
                type: Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
