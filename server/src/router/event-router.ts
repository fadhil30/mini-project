import express from "express";
import {
  CreateEvent,
  GetDetailEvent,
  GetEvents,
} from "../controller/event-controller";

import { CreateEvent, GetEvents } from "../controller/event-controller";

import { upload } from "../middleware/upload-middleware";

const router = express.Router();

router.route("/").get(GetEvents).post(upload.single("image"), CreateEvent);
router.route("/:id").get(GetDetailEvent);


export default router;
