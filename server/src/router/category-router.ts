import express from "express";
import { upload } from "../middleware/upload-middleware";
import { CreateCategory, GetCategory } from "../controller/category-controller";

const router = express.Router();

router.route("/").get(GetCategory).post(upload.single("image"), CreateCategory);

export default router;
