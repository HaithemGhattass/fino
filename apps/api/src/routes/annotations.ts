import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Get annotations for page
router.get("/:pageId", requireAuth, async (req, res) => {
  const { pageId } = req.params;

  const notes = await prisma.annotation.findMany({
    where: { pageId },
  });

  res.json(notes);
});

// Create annotation
router.post("/", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const { pageId, x, y, content } = req.body;

  const note = await prisma.annotation.create({
    data: { pageId, userId, x, y, content },
  });

  res.json(note);
});

export default router;
