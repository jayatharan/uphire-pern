import express from "express";
import {
    getAllUserSkill, 
    createUserSkill,
    updateUserSkill,
    getUserSkill,
    deleteUserSkill
} from "../controllers/userSkill.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllUserSkill
)

router.post(
    "/",
    requiredUser,
    createUserSkill
)

router.patch(
    "/:id",
    requiredUser,
    updateUserSkill
)

router.get(
    "/:id",
    requiredUser,
    getUserSkill
)

router.delete(
    "/:id",
    requiredUser,
    deleteUserSkill
)

export default router;