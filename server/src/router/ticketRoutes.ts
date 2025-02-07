import express from "express";
import { buyTicket } from "../controller/ticketController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Role } from "@prisma/client";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(Role.CUSTOMER));

router.post("/buy", buyTicket);

export default router;