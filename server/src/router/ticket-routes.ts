import express from "express";
import { buyTicket } from "../controller/ticket-controller";
import { authenticateToken } from "../middleware/auth-middleware";
import { roleMiddleware } from "../middleware/role-middleware";

const router = express.Router();

router.use(authenticateToken);
 //router.use(roleMiddleware(user));

router.post("/buy", buyTicket);

export default router;
