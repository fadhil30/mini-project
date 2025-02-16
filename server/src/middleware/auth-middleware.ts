import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pastikan `DecodedToken` memiliki properti `name` sesuai dengan tipe yang digunakan di `req.user`
interface DecodedToken extends JwtPayload {
  id: number;
  role: string;
  name?: string; // Opsional agar kompatibel dengan berbagai tipe user
}

// Middleware autentikasi
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Gunakan optional chaining untuk menghindari error

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Pastikan `req.user` sesuai dengan tipe yang diterima oleh aplikasi
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name || "Unknown User", // Beri default jika name tidak tersedia
    };

    next(); // Lanjut ke middleware berikutnya
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};


export function roleGuard(allowedRole: "user" | "promotor") {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
       res.status(401).json({ message: "Unauthorized: No user found" });
        return;
      }

      let role: "user" | "promotor" | null = null;

      // Cek apakah pengguna dari tabel User atau Promotor
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (user) {
        role = "user";
      } else {
        const promotor = await prisma.promotor.findUnique({ where: { id: req.user.id } });
        if (promotor) {
          role = "promotor";
        }
      }

      if (role !== allowedRole) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
      }

      return next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
      return;
    }
  };
}


