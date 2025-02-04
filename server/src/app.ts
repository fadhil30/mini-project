import express from "express";

const app = express();
const PORT = 8000;

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "API Connected" });
});

app.post("/api/v1/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
