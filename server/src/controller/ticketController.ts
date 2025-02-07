import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/express"; // Import tipe AuthRequest

const prisma = new PrismaClient();

export const buyTicket = async (req: AuthRequest, res: Response) => {
  const { eventId, discountUsed } = req.body;

  try {
    if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
    }

    const finalPrice = event.price - (discountUsed || 0);

    const ticket = await prisma.ticket.create({
      data: {
        eventId,
        userId: req.user.id,
        pricePaid: finalPrice,
        discountUsed: discountUsed || 0,
      },
    });

    res.status(201).json({ message: "Ticket purchased", ticket });
  } catch (err: any) {
    res.status(500).json({ message: "Error purchasing ticket", error: err.message });
  }
};
