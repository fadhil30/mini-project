// express.d.ts
import { JwtPayload } from "jsonwebtoken";

// Define a custom JWT payload interface that extends the default JwtPayload
interface CustomJwtPayload extends JwtPayload {
  id: number; // User ID
  name: string; // User name
  role: string; // User role
}

// Extend the Express namespace to include the custom user property in the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload | null; // Optional user property
    }
  }
}
