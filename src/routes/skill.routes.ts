import express from "express";
import {
    getAllSkill, 
    createSkill,
    updateSkill,
    getSkill,
    deleteSkill,
    searchSkill
} from "../controllers/skill.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllSkill
)

router.post(
    "/",
    requiredUser,
    createSkill
)

router.patch(
    "/:id",
    requiredUser,
    updateSkill
)

router.get(
    "/search",
    requiredUser,
    searchSkill
)

router.get(
    "/:id",
    requiredUser,
    getSkill
)

router.delete(
    "/:id",
    requiredUser,
    deleteSkill
)

export default router;