import express from "express";
import {
    getAllTeamProposal, 
    createTeamProposal,
    updateTeamProposal,
    getTeamProposal,
    deleteTeamProposal,
    getMyTeamProposals
} from "../controllers/teamProposal.controller";
import { 
    requiredUser
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllTeamProposal
)

router.post(
    "/",
    requiredUser,
    createTeamProposal
)

router.get(
    "/my-team-proposals",
    requiredUser,
    getMyTeamProposals
)

router.patch(
    "/:id",
    requiredUser,
    updateTeamProposal
)

router.get(
    "/:id",
    requiredUser,
    getTeamProposal
)

router.delete(
    "/:id",
    requiredUser,
    deleteTeamProposal
)

export default router;