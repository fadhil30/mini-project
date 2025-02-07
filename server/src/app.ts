import "dotenv/config";
import express from "express";
import eventRouter from "./routers/event-router";
import categoryRouter from "./routers/category-router";
import authRoutes from "./router/authRoutes";
import ticketRoutes from "./router/ticketRoutes";
import userRoutes from "./router/userRoutes";
import dotenv from "dotenv";
import cors from "cors";



const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "API Connected" });
});

dotenv.config();
// Routes
app.use("/auth", authRoutes);
app.use("/customer", ticketRoutes);
app.use("/user", userRoutes);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
