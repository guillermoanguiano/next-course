import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            console.log(req.project.id, task);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send({ success: true, task });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate(
                "project"
            );

            if (!tasks) {
                const error = new Error("There are no tasks");
                return res.status(404).json({ msg: error.message });
            }

            res.send(tasks);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.send(req.task);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();
            res.send({ success: true, task: req.task });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;

            req.task.status = status;
            await req.task.save();

            res.send({ success: true, task: req.task });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== req.task.id.toString()
            );
            await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
            res.send({ success: true, message: "Task deleted" });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };
}
