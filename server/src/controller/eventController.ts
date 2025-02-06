import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/express"; // Import tipe kustom

const prisma = new PrismaClient();

export const createEvent = async (req: AuthRequest, res: Response) => {
  const { title, description, date, price } = req.body;

  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        price,
        organizerId: req.user.id, // Sekarang TypeScript mengenali req.user
      },
    });

    res.status(201).json({ message: "Event created", event });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error creating event", error: err.message });
  }
};

export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const events = await prisma.event.findMany({
      where: { organizerId: req.user.id },
    });

    res.json({ events });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: err.message });
  }
};
