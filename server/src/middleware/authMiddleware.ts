import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  id: number;
  role: string;
}

// **Tambahkan tipe `RequestWithUser` agar `req.user` dikenali**
interface RequestWithUser extends Request {
  user?: User;
  
  
}

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // **Gunakan `await` dengan benar**
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user; // **Tambahkan `user` ke dalam request**
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

//export function roleGuard(role: string){
//   return async function (req: RequestWithUser, res: Response, next: NextFunction) {
//       try {

//           if (req.user?.role === "CUSTOMER") {
//               next();
//               return;
//             }
            
//           if (req.user?.role !== role){
//               res.status(401).json({message: "unathorized access. forbidden!"});
//               return;
//           }
//       } catch (error) {
          
//       }
//   }
// }