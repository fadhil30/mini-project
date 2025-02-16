import "dotenv/config";
import express from "express";
import eventRouter from "./router/event-router";
import categoryRouter from "./router/category-router";
import authRoutes from "./router/auth-routes";
import ticketRoutes from "./router/ticket-routes";

import dotenv from "dotenv";
import cors from "cors";
import promotorDashrouter from "./router/dashboard-routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


dotenv.config();
// Routes
app.use("/auth", authRoutes);
app.use("/customer", ticketRoutes);

app.use("/category", categoryRouter);
app.use("/promotor", authRoutes);

app.use("/events", eventRouter);
app.use("/dashboard", promotorDashrouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
