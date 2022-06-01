import express from "express";
import { Request, Response } from "express";

import user from "./user.routes";
import session from "./session.routes";
import address from "./address.routes";
import company from "./company.routes";
import biography from "./biography.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.send("Welcome to uphire server"));
router.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));


router.use("/users", user);
router.use("/sessions", session);
router.use("/address", address);
router.use("/company", company);
router.use("/biography", biography);

export default router;