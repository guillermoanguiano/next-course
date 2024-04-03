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

    static getTaskById = async ({ params }: Request, res: Response) => {
        try {
            const { taskId, projectId } = params;
            const task = await Task.findOne({
                _id: taskId,
                project: projectId,
            });

            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ msg: error.message });
            }

            res.send(task);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static updateTask = async ({ params, body }: Request, res: Response) => {
        try {
            const { taskId, projectId } = params;
            const task = await Task.findOneAndUpdate(
                { _id: taskId, project: projectId },
                body
            );
            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ msg: error.message });
            }
            res.send({ success: true, task });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { taskId, projectId } = req.params;
            const task = await Task.findById(taskId);
            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ msg: error.message });
            }
            const { status } = req.body;

            task.status = status;
            await task.save();

            res.send({ success: true, task });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { taskId, projectId } = req.params;
            const task = await Task.findOne({
                _id: taskId,
                project: projectId,
            });

            if (!task) {
                return res
                    .status(404)
                    .send({ success: false, message: "Task not found" });
            }

            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== taskId
            );

            await Promise.allSettled([task.deleteOne(), req.project.save()]);

            res.send({ success: true, message: "Task deleted" });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };
}
