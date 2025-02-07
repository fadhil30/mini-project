import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/express"; // Import AuthRequest

const prisma = new PrismaClient();

export const redeemPoints = async (req: AuthRequest, res: Response) => {
  const { pointsToRedeem } = req.body;

  try {
    if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user || user.points < pointsToRedeem) {
    res.status(400).json({ message: "Not enough points" });
    return;
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { points: { decrement: pointsToRedeem } },
    });

    await prisma.redeemedPoint.create({
      data: {
        userId: req.user.id,
        pointsUsed: pointsToRedeem,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 bulan
      },
    });

    res.json({ message: "Points redeemed" });
  } catch (err: any) {
    res.status(500).json({ message: "Error redeeming points", error: err.message });
  }
};
