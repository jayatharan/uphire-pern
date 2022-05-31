import express from "express";
import {
    createUserHandler, updateUserHandler, updateUserBiography, getUserDetails
} from '../controllers/user.controller'
import { 
    createUserSchema, updateUserSchema
} from "../schemas/user.schema";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getUserDetails
);

router.post(
    "/",
    validateRequest(createUserSchema),
    createUserHandler
)

router.patch(
    "/",
    validateRequest(updateUserSchema),
    requiredUser,
    updateUserHandler
)

router.post(
    "/biography",
    requiredUser,
    updateUserBiography
);

export default router;