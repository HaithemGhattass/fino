import { Router } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.get("/health", (_, res) => {
    console.log("Health check OK");
  res.json({ status: "ok" });
});

router.get("/me", requireAuth, (req, res) => {
    console.log((req as any).user,".....");
  res.json({ user: (req as any).user });
});
export default router;
