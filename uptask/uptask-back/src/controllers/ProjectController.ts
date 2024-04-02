import type { Request, Response } from 'express';
import Project from '../models/Project';
import colors from 'colors';

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);
        try {
            await project.save();

            console.log(colors.green.bold(`Project ${project.projectName} created`));

            res.send(project);
        } catch (error) {
            console.log(colors.red.bold(error));
        }
    }
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});

            if (!projects) return res.status(404).send({ success: false, message: 'There are no projects' });

            res.json(projects);
        } catch (error) {
            console.log(colors.red.bold(error));
        }
    }

    static getProject = async ({ params: { id } }: Request, res: Response) => {
        try {
            const project = await Project.findById(id);

            if (!project) return res.status(404).send({ success: false, message: 'No project found' });

            res.json(project);
        } catch (error) {
            console.log(colors.red.bold(error));
        }
    }
    

    static updateProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findByIdAndUpdate(req.params.id, req.body);

            if (!project) return res.status(404).send({ success: false, message: 'No project found' });

            res.json({ success: true , message: `Project ${project?.projectName} updated` });
        } catch (error) {
            console.log(colors.red.bold(error));
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findByIdAndDelete(req.params.id);

            if (!project) return res.status(404).send({ success: false, message: 'No project found' });

            res.json({ success: true , message: `Project ${project?.projectName} deleted` });
        } catch (error) {
            console.log(colors.red.bold(error));
        }
    }
}