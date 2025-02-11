import { Request, Response, NextFunction } from "express";
import { User, Promotor } from "@prisma/client";

// **Tambahkan tipe custom agar req.user dan req.promotor dikenali**
interface RequestWithAuth extends Request {
  user?: User;
  promotor?: Promotor;
}

export const roleMiddleware = (type: "user" | "promotor") => {
  return (req: RequestWithAuth, res: Response, next: NextFunction) => {
    if (type === "user" && !req.user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }
    
    if (type === "promotor" && !req.promotor) {
      return res.status(401).json({ message: "Unauthorized, promotor not found" });
    }

    next();
  };
};
