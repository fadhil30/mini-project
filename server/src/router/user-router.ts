import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

// Hanya promotor yang bisa mengakses route ini
router.get(
  "/protected-route",
  authMiddleware.authenticateToken,
  authMiddleware.roleGuard("promotor"),
  (req, res) => {
    res.json({ message: "You have access to this route as a Promotor!" });
  }
);

export default router;
