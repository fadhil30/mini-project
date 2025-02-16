// /pages/api/transactions/transaction-router.ts
import express, { Request, Response, NextFunction } from "express";
import {
  CreateTransaction,
  GetTransaction,
} from "../controller/transaction-controller";

const router = express.Router();

// Route to create a transaction
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CreateTransaction(req, res, next);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Route to get a specific transaction by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await GetTransaction(req, res, next);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

export default router;
