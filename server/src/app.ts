import "dotenv/config";
import express from "express";
import eventRouter from "./router/event-router";
import categoryRoutes from "./router/category-router";
import authRoutes from "./router/auth-router";
import ticketRoutes from "./router/ticket-router";
import userRoutes from "./router/user-router";
import transactionRoutes from "./router/transaction-router";
import promotionRoutes from "./router/promotion-router";
import walletRoutes from "./router/wallet-router";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "API Connected" });
});

dotenv.config();
// Routes
app.use("/auth", authRoutes);
app.use("/customer", ticketRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRouter);
app.use("/category", categoryRoutes);
app.use("/promotor", authRoutes);
app.use("/transaction", transactionRoutes);
app.use("/promotion", promotionRoutes);
app.use("/wallet", walletRoutes);
app.use("/ticket", ticketRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
