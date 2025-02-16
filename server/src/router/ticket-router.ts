import express from "express";
import { createTicket, getAllTickets } from "../controller/ticket-controller";

const router = express.Router();

router.route("/").get(getAllTickets).post(createTicket);

export default router;
