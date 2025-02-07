import { NextFunction, Request, Response } from "express";
import cloudinary from "../configs/cloudinary";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function CreateEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      title,
      description,
      location,
      eventStartDate,
      eventStartTime,
      eventEndTime,
      categoryId,
      ticketPrice,
    } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "Missing image!" });
      return;
    }

    const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog/images",
    });
    fs.unlink(req.file.path);

    const newEvent = await prisma.event.create({
      data: {
        title,
        image: cloudinaryData.secure_url,
        description,
        location,
        eventStartDate: new Date(eventStartDate),
        eventStartTime: new Date(eventStartTime),
        eventEndTime: new Date(eventEndTime),
        categoryId,
        ticketPrice,
      },
    });
    res
      .status(201)
      .json({ ok: true, message: "New Event Added!", newEvent: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error creating" });
  }
}

export async function GetEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({ ok: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error fetching events" });
  }
}
