import { JwtPayload } from "jsonwebtoken";
import { User, Promotor } from "@prisma/client";

interface CustomJwtPayload extends JwtPayload {
  id: number;
  name: string;
  role: string;
}

// ✅ Gabungkan semua deklarasi Express Request dalam satu blok
declare global {
  namespace Express {
    interface Request {
      user?:
        | CustomJwtPayload
        | (User & { id: number; role: string })
        | (Promotor & { id: number; role: string })
        | null;
    }
  }
}
