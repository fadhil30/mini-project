
import { Request, Response, NextFunction, } from "express";


export const roleMiddleware = (allowedRole: "user" | "promotor") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Cek apakah role sesuai
    if (
      (allowedRole === "user" && "points" in req.user) || 
      (allowedRole === "promotor" && !("points" in req.user))
    ) {
      return next();
    }

    res.status(403).json({ message: "Forbidden: You do not have access" });
    return;
  };
};
