import express from "express";
import { createEvent, getEvents } from "../controller/eventController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Role } from "@prisma/client";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(Role.PROMOTER));


router.route("/events").post(createEvent);

router.route("/events").get(authMiddleware, getEvents);

export default router;
