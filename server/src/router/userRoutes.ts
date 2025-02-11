import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

// router.get("/protected-route", authMiddleware, roleMiddleware(Role.PROMOTER), (req, res) => {
//   res.json({ message: "You have access to this route!" });
// });

export default router;
