import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

// Hanya promotor yang bisa mengakses route ini
router.get(
  "/protected-route",
  authMiddleware,
  roleMiddleware("promotor"),
  (req, res) => {
    res.json({ message: "You have access to this route as a Promotor!" });
  }
);

export default router;
