import type { Request, Response } from "express";
import Project from "../models/Project";
import chalk from "../util/chalk";

export class ProjectController {
    static createProject = async ({ body }: Request, res: Response) => {
        const project = new Project(body);
        try {
            await project.save();

            chalk.success(`Project ${project.projectName} created`);

            res.send(project);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };
    static getAllProjects = async (_: Request, res: Response) => {
        try {
            const projects = await Project.find({});

            if (!projects) {
                const error = new Error("There are no projects");
                return res.status(404).json({ msg: error.message });
            }

            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static getProjectById = async ({ params }: Request, res: Response) => {
        try {
            const project = await Project.findById(params.id).populate("tasks");

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ msg: error.message });
            }

            res.json(project);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ msg: error.message });
            }

            project.projectName = req.body.projectName;
            project.clientName = req.body.clientName;
            project.description = req.body.description;
            await project.save();

            res.json({
                success: true,
                message: `Project ${project?.projectName} updated`,
            });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static deleteProject = async ({ params }: Request, res: Response) => {
        try {
            const project = await Project.findById(params.id);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ msg: error.message });
            }

            await project.deleteOne();

            chalk.success(`Project ${project?.projectName} deleted`);

            res.json({
                success: true,
                message: `Project ${project?.projectName} deleted`,
            });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };
}
