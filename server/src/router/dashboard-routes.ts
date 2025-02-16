import express from "express";
import { getPromotorDashboard } from "../controller/dashboard-controller";
// import { roleGuard } from "../middleware/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(getPromotorDashboard);

export default router;