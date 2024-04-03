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

            if (!projects)
                return res
                    .status(404)
                    .send({ success: false, message: "There are no projects" });

            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static getProjectById = async ({ params }: Request, res: Response) => {
        try {
            const project = await Project.findById(params.id).populate("tasks");

            if (!project)
                return res
                    .status(404)
                    .send({ success: false, message: "No project found" });

            res.json(project);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    };

    static updateProject = async ({ params, body }: Request, res: Response) => {
        try {
            const project = await Project.findByIdAndUpdate(params.id, body);

            if (!project)
                return res
                    .status(404)
                    .send({ success: false, message: "No project found" });

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

            if (!project)
                return res
                    .status(404)
                    .send({ success: false, message: "No project found" });

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
