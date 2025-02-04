import { NextFunction, Request, Response } from "express";
import cloudinary from "../configs/cloudinary";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CreateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "Missing image!" });
      return;
    }

    const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog/images",
    });
    
    fs.unlink(req.file.path);
    const newCategory = await prisma.category.create({
      data: { name, image: cloudinaryData.secure_url },
    });
    res.status(200).json({
      ok: true,
      message: "New category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error creating" });
  }
}

export async function GetCategory(req: Request, res: Response) {
  try {
    const category = await prisma.category.findMany();
    res.status(200).json({ ok: true, data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error" });
  }
}
