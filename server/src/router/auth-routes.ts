import { Router } from "express";
import { 
  register, 
  login, 
  registerPromotor,
  getUser,
  getPromotor,
  logout 
} from "../controller/auth-controller";
import { authenticateToken } from "../middleware/auth-middleware";

const router = Router();

// Public routes - directly use the controller functions
router.route("/register").post(register);
router.route("/register-promotor").post(registerPromotor);
router.route("/login").post(login);
router.route("/logout").post(logout);

// Protected routes
router.get("/user", authenticateToken, getUser);
router.get("/promotor", authenticateToken, getPromotor);

export default router;
