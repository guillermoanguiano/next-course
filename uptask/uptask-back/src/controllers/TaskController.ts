import type { Request, Response } from "express";
import Task from "../models/Task";
import colors from "colors";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            console.log(colors.red.bold(error));
        }
    };

    static getAllTasks = async (_: Request, res: Response) => {};

    static getTaskById = async (
        { params: { id } }: Request,
        res: Response
    ) => {};

    static updateTask = async (
        { params: { id }, body }: Request,
        res: Response
    ) => {};

    static deleteTask = async (
        { params: { id } }: Request,
        res: Response
    ) => {};
}
