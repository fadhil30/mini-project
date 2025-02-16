import express from "express";
import { createPromotion, getAllPromotions } from "../controller/promotion-controller";

const router = express.Router();

router.route("/").get(getAllPromotions).post(createPromotion);

export default router;