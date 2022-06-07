import express from "express";
import {
    getAllJob, 
    createJob,
    updateJob,
    getJob,
    deleteJob,
    getMyJobs
} from "../controllers/job.controller";
import { 
    requiredUser
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllJob
)

router.post(
    "/",
    requiredUser,
    createJob
)

router.get(
    "/my-jobs",
    requiredUser,
    getMyJobs
)

router.patch(
    "/:id",
    requiredUser,
    updateJob
)

router.get(
    "/:id",
    requiredUser,
    getJob
)

router.delete(
    "/:id",
    requiredUser,
    deleteJob
)

export default router;