import express, { Request, Response } from "express";
import { register, login, registerPromotor } from "../controller/authController";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  await register(req, res);
});
router.post("/registerPromotor", async (req: Request, res: Response) => {
  await registerPromotor(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await login(req, res);
});

export default router;
