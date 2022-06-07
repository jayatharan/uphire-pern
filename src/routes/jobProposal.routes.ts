import express from "express";
import {
    getAllJobProposal, 
    createJobProposal,
    updateJobProposal,
    getJobProposal,
    deleteJobProposal,
    getMyJobProposals
} from "../controllers/jobProposal.controller";
import { 
    requiredUser
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllJobProposal
)

router.post(
    "/",
    requiredUser,
    createJobProposal
)

router.get(
    "/my-job-proposals",
    requiredUser,
    getMyJobProposals
)

router.patch(
    "/:id",
    requiredUser,
    updateJobProposal
)

router.get(
    "/:id",
    requiredUser,
    getJobProposal
)

router.delete(
    "/:id",
    requiredUser,
    deleteJobProposal
)

export default router;