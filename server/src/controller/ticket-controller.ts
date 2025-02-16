
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const createTicket = async (req, res) => {
  const { ticketCode, eventId, userId, pricePaid } = req.body;
  try {
    const ticket = await prisma.ticket.create({
      data: {
        ticketCode,
        eventId,
        userId,
        pricePaid,
      },
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};
