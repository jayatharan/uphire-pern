import express from "express";
import {
    getAllTeam, 
    createTeam,
    updateTeam,
    getTeam,
    deleteTeam,
    getMyTeams
} from "../controllers/team.controller";
import { 
    requiredUser
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllTeam
)

router.post(
    "/",
    requiredUser,
    createTeam
)

router.get(
    "/my-teams",
    requiredUser,
    getMyTeams
)

router.patch(
    "/:id",
    requiredUser,
    updateTeam
)

router.get(
    "/:id",
    requiredUser,
    getTeam
)

router.delete(
    "/:id",
    requiredUser,
    deleteTeam
)

export default router;