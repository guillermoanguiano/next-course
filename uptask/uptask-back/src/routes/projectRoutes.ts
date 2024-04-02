import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

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
router.post("/:projectId/tasks",);

export default router;
