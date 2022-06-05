import express from "express";
import {
    getAllProjectProposal, 
    createProjectProposal,
    updateProjectProposal,
    getProjectProposal,
    deleteProjectProposal,
    getMyProjectProposals
} from "../controllers/projectProposal.controller";
import { 
    requiredUser
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllProjectProposal
)

router.post(
    "/",
    requiredUser,
    createProjectProposal
)

router.get(
    "/my-project-proposals",
    requiredUser,
    getMyProjectProposals
)

router.patch(
    "/:id",
    requiredUser,
    updateProjectProposal
)

router.get(
    "/:id",
    requiredUser,
    getProjectProposal
)

router.delete(
    "/:id",
    requiredUser,
    deleteProjectProposal
)

export default router;