import { Request, Response, NextFunction } from "express";
import { Role, User } from "@prisma/client";

// **Tambahkan tipe custom agar req.user dikenali**
interface RequestWithUser extends Request {
  user?: User;
}

export const roleMiddleware = (role: Role) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
    res.status(401).json({ message: "Unauthorized, no user found" });
    return;
    }

    if (req.user.role !== role) {
    res.status(403).json({ message: "Access denied" });
    return;
    }

    next();
  };
};
