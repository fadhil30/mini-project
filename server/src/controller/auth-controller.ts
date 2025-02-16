import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, User, Promotor } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const referralCode = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        referralCode,
      },
    });

    // Buat wallet baru untuk pengguna
    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

export const registerPromotor = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat promotor baru
    const promotor = await prisma.promotor.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Promotor registered", promotor });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error registering promotor", error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna di model User
    let user: User | Promotor | null = null;
    user = await prisma.user.findUnique({ where: { email } });
    let role = "user";

    // Jika tidak ditemukan di User, coba di Promotor
    if (!user) {
      user = await prisma.promotor.findUnique({ where: { email } });
      role = "promotor";
    }

    // Jika tidak ditemukan di kedua model, atau password salah
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Buat token JWT dengan role
    const token = jwt.sign(
      { id: user.id, role, name: user.fullName }, // Menyimpan ID dan role dalam token
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" } // Token berlaku selama 24 jam
    );

    // Set cookie untuk menyimpan token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Kirim respons dengan token dan role
    res.json({ message: "Logged in", token, role });
  } catch (err: any) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.user = null;
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.json({ message: "Logged out successfully" });
};

