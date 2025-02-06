import express from "express";
import authRoutes from "./router/authRoutes";
import eventRoutes from "./router/eventRoutes";
import ticketRoutes from "./router/ticketRoutes";
import userRoutes from "./router/userRoutes";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
// Routes
app.use("/auth", authRoutes);
app.use("/promotor", eventRoutes);
app.use("/customer", ticketRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
