// /controllers/wallet-controller.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const getWalletByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: Number(userId) }, // Konversi userId ke integer
    });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
};

export const updateWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, balance } = req.body;
  if (!userId || balance === undefined) {
    return res.status(400).json({ error: "User ID and balance are required" });
  }

  try {
    const wallet = await prisma.wallet.update({
      where: { userId: Number(userId) }, // Konversi userId ke integer
      data: { balance },
    });
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update wallet" });
  }
};
