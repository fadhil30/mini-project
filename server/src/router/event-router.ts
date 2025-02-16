
import express from "express";
import {
  CreateEvent,
  GetDetailEvent,
  GetEvents, getEventTrans,
} from "../controller/event-controller";

import { upload } from "../middleware/upload-middleware";

const router = express.Router();

router.route("/").get(GetEvents).post(upload.single("image"), CreateEvent);
router.route("/:id").get(GetDetailEvent);
router.get("/", getEventTrans);


export default router;
