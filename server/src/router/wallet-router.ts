// /pages/api/wallet/wallet-router.ts
import express, { Request, Response, NextFunction } from "express";
import {
  getWalletByUserId,
  updateWallet,
} from "../controller/wallet-controller";

const router = express.Router();

// Route to get wallet by user ID
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getWalletByUserId(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to update wallet
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateWallet(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
