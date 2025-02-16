import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, type User, type Promotor } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function register(req: Request, res: Response) {
  const { fullName, email, password, referralCodeUsed } = req.body;

  // Generate referral code unik untuk user baru
  const referralCode = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  try {
    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Variabel untuk tracking poin
    let points = 0;
    let referrerId: number | null = null;

    // Jika user menggunakan referral code, cek apakah referral code valid
    if (referralCodeUsed) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referralCodeUsed },
      });

      if (referrer) {
        points = 10000; // Berikan 10.000 poin ke user baru
        referrerId = referrer.id;

        // Buat kupon diskon 10% untuk user baru
        await prisma.coupon.create({
          data: {
            userId: referrer.id,
            code: Math.random().toString(36).substring(2, 10).toUpperCase(), // Generate kode unik
            discountRate: 10, // Diskon 10%
            used: false, // Kupon belum digunakan
            expiredDate: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            ), // Berlaku 1 bulan
          },
        });

        await prisma.point.create({
          data: {
            userId: referrer.id,
            balance: referrer.points + 1000, // Tambah poin referrer
            expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }

    // Buat user baru dengan poin dan referralId
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        referralCode,
        points,
        referrerId,
      },
    });

    // Buat wallet baru untuk pengguna
    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        balance: 0,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        points: newUser.points,
        referralCode: newUser.referralCode,
      },
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
}

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
      res.status(400).json({ message: "Invalid credentials" });
      return;
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

    res.status(200).json({ message: "Logged in", token, role });
  } catch (err: any) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // Get user ID from authenticated request
    const userId = (req.user as { id: number })?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Fetch user with related data but exclude sensitive information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        referralCode: true,
        emailConfirmed: true,
        points: true,
        createdAt: true,
        updatedAt: true,
        // Include related data
        tickets: {
          include: {
            event: true,
          },
        },
        redeemedPoints: true,
        ReferreredUsers: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ user });
  } catch (err: any) {
    res.status(500).json({
      message: "Error fetching user details",
      error: err.message,
    });
  }
};

export const getPromotor = async (req: Request, res: Response) => {
  try {
    // Get promotor ID from authenticated request
    const promotorId = (req.user as { id: number })?.id;

    if (!promotorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Fetch promotor with related data but exclude sensitive information
    const promotor = await prisma.promotor.findUnique({
      where: { id: promotorId },
      select: {
        id: true,
        fullName: true,
        email: true,
        emailConfirmed: true,
        createdAt: true,
        updatedAt: true,
        // Include related events with their details
        Event: {
          include: {
            Category: true,
            Ticket: true,
            Attendee: true,
            PromotorTrans: true,
          },
        },
      },
    });

    if (!promotor) {
      res.status(404).json({ message: "Promotor not found" });
      return;
    }

    res.json({ promotor });
  } catch (err: any) {
    res.status(500).json({
      message: "Error fetching promotor details",
      error: err.message,
    });
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
