import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Name must be 3 character or more"),
  username: z.string().min(3, "Username must be 3 character or more"),
  email: z
    .string()
    .min(3, "Name must be 3 character or more")
    .email("Invalid email format"),
  password: z.string().min(6, "Password must be 6 character or more"),
  role: z.enum(["COSTUMER", "PROMOTER"]),
});
