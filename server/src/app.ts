import "dotenv/config";
import express from "express";
import eventRouter from "./routers/event-router";
import categoryRouter from "./routers/category-router";

const app = express();
const PORT = 8000;

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "API Connected" });
});

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
