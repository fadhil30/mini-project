import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";
import { Resend } from "resend";
import crypto from "node:crypto";
import fs from "fs/promises";
import handlebars from "handlebars";
import { registerSchema } from "../schemas/auth-schema";

const prisma = new PrismaClient();

export async function Register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullName, email, password, role } = registerSchema.parse(req.body);
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "Missing required fields!" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      res.status(400).json({ message: "Email has already taken!!!" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { fullName, email, password: hashedPassword, role },
    });
    const confirmToken = crypto.randomBytes(10).toString("hex");
    const confirmationLink = `http://localhost:8000/api/v1/auth/confirm-email?token=${confirmToken}`;

    await prisma.confirmToken.create({
      data: {
        expiredDate: new Date(Date.now() + 1000 * 60 * 5),
        token: confirmToken,
        userId: newUser.id,
      },
    });

    const templateSource = await fs.readFile(
      "src/templates/email-confirmation-template.hbs"
    );
    const compiledTemplate = handlebars.compile(templateSource.toString());
    const htmlTemplate = compiledTemplate({
      fullName: fullName,
      confirmationLink: confirmationLink,
    });
    const { error } = await resend.emails.send({
      from: "JustBlog <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Just Blog",
      html: htmlTemplate,
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    res.status(201).json({ ok: true, message: "New user added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error" });
  }
}
