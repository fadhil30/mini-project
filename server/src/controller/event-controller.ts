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
      eventSchedule,
      categoryId,
      ticketPrice,
      ticketAvailability,
      host,
      eventType,
    } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "Missing image!" });
      return;
    }

    const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog/images",
    });
    fs.unlink(req.file.path);

    // Save the new event
    const newEvent = await prisma.event.create({
      data: {
        title,
        image: cloudinaryData.secure_url,
        description,
        location,
        eventSchedule: new Date(eventSchedule), // Storing only time in GMT+7
        categoryId: +categoryId,
        ticketPrice: +ticketPrice,
        ticketAvailability: +ticketAvailability,
        host,
        eventType,
        promotorId: req.user?.id,
      },
    });

    res
      .status(201)
      .json({ ok: true, message: "New Event Added!", newEvent: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error creating event" });
  }
}

export async function GetEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await prisma.event.findMany({ include: { Category: true } });
    res.status(200).json({ ok: true, data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error fetching events" });
  }
}

export async function GetDetailEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: +req.params.id },
      include: { Category: true },
    });
    const response = {
      id: event?.id,
      title: event?.title,
      image: event?.image,
      description: event?.description,
      location: event?.location,
      eventSchedule: event?.eventSchedule,
      category: event?.Category.name,
      ticketPrice: event?.ticketPrice,
      ticketAvailability: event?.ticketAvailability,
      host: event?.host,
    };
    res.status(200).json({ ok: true, data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: "Error fetching detail event details" });
  }
}

export async function getEventTrans(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await prisma.event.findMany({
      include: { Attendee: true, PromotorTrans: true },
    });
  } catch (error) {}
}
