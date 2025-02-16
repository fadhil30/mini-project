import express from "express";
import {
  authenticateToken,
  authMiddleware,
  roleGuard,
} from "../middleware/auth-middleware";
import {
  CreateTransaction,
  GetAllTransaction,
} from "../controller/transaction-controller";

const router = express.Router();

// Rute untuk membuat transaksi
router
  .route("/")
  .get(GetAllTransaction)
  .post(authenticateToken, roleGuard("user"), CreateTransaction);

export default router;
