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
            chalk.error(error);
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
            chalk.error(error);
        }
    };

    static getProjectById = async (
        { params: { id } }: Request,
        res: Response
    ) => {
        try {
            const project = await Project.findById(id);

            if (!project)
                return res
                    .status(404)
                    .send({ success: false, message: "No project found" });

            res.json(project);
        } catch (error) {
            chalk.error(error);
        }
    };

    static updateProject = async (
        { params: { id }, body }: Request,
        res: Response
    ) => {
        try {
            const project = await Project.findByIdAndUpdate(id, body);

            if (!project)
                return res
                    .status(404)
                    .send({ success: false, message: "No project found" });

            res.json({
                success: true,
                message: `Project ${project?.projectName} updated`,
            });
        } catch (error) {
            chalk.error(error);
        }
    };

    static deleteProject = async (
        { params: { id } }: Request,
        res: Response
    ) => {
        try {
            const project = await Project.findById(id);

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
            chalk.error(error);
        }
    };
}
