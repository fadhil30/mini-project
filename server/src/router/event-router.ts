import express from "express";
import { CreateEvent, GetEvents } from "../controller/event-controller";
import { upload } from "../middleware/upload-middleware";

const router = express.Router();

router.route("/").get(GetEvents).post(upload.single("image"), CreateEvent);

export default router;
