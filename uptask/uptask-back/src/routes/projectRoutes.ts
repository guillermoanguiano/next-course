import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";

const router: Router = Router();

router.post(
    "/",
    // With this we can validate the body of the request using express-validator
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    // We pass the handleInputErrors middleware to validate the request
    handleInputErrors,
    ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid ID"),
    handleInputErrors,
    ProjectController.getProjectById
);
router.put(
    "/:id",
    param("id").isMongoId().withMessage("Invalid ID"),
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.updateProject
);
router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid ID"),
    handleInputErrors,
    ProjectController.deleteProject
);

// *  Routes for tasks
router.param("projectId", projectExists);
router.post(
    "/:projectId/tasks",
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getAllTasks);

router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject); 

router.get(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid ID"),
    handleInputErrors,
    TaskController.getTaskById
);

router.put(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid ID"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    TaskController.updateTask
);

router.post(
    "/:projectId/tasks/:taskId/status",
    param("taskId").isMongoId().withMessage("Invalid ID"),
    body("status").notEmpty().withMessage("Status is required"),
    handleInputErrors,
    TaskController.updateTaskStatus
);

router.delete(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid ID"),
    handleInputErrors,
    TaskController.deleteTask
);


export default router;
