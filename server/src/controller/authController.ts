import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password, role } = req.body;

  if (!Object.values(Role).includes(role)) {
    res.status(400).json({ message: "Invalid role" });
    return;
  }

  const referralCode = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role,
        referralCode,
      },
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      {}
    );

    // Set cookie untuk menyimpan token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Hanya gunakan HTTPS di produksi
      sameSite: "none", // Hindari pengiriman lintas situs
    });

    res.json({ message: "Logged in", token });
  } catch (err: any) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.json({ message: "Logged out successfully" });
};
