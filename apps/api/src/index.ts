import express from "express";
import cors from "cors";
import { requireAuth } from "../middleware/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/me", requireAuth, (req, res) => {
  res.json({ user: (req as any).user });
});


app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});

