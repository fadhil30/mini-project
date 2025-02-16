import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const buyTicket = async (req: Request, res: Response) => {
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

    const finalPrice = event.ticketPrice - (discountUsed || 0);

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
