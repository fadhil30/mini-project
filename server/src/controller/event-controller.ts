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
    console.log(req.body);
    console.log(req.file);
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

    // Convert eventStartDate to just the date (yyyy-mm-dd)
    // const eventStartDateOnly = new Date(eventStartDate)
    //   .toISOString()
    //   .split("T")[0];

    // // Convert eventStartTime and eventEndTime to time in GMT+7
    // const convertToGMT7 = (time: string) => {
    //   const date = new Date(`1970-01-01T${time}Z`); // Using a base date of '1970-01-01'
    //   date.setHours(date.getHours() + 7); // Convert to GMT+7
    //   return date.toLocaleTimeString("en-GB", { hour12: false }); // Format as 24-hour time
    // };

    // const eventStartTimeOnly = convertToGMT7(eventStartTime);

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
