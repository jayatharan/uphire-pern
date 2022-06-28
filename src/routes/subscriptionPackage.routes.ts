import express from "express";
import {
    getAllSubscriptionPackage, 
    createSubscriptionPackage,
    updateSubscriptionPackage,
    getSubscriptionPackage,
    deleteSubscriptionPackage
} from "../controllers/subscriptionPackage.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllSubscriptionPackage
)

router.post(
    "/",
    requiredUser,
    createSubscriptionPackage
)

router.patch(
    "/:id",
    requiredUser,
    updateSubscriptionPackage
)

router.get(
    "/:id",
    requiredUser,
    getSubscriptionPackage
)

router.delete(
    "/:id",
    requiredUser,
    deleteSubscriptionPackage
)

export default router;