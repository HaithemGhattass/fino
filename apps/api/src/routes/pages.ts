import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Get pages for a project
router.get("/:projectId", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const { projectId } = req.params;

  const pages = await prisma.page.findMany({
    where: {
      projectId,
      project: { userId },
    },
  });

  res.json(pages);
});

// Create page
router.post("/", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const { projectId, url } = req.body;

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) return res.sendStatus(403);

  const page = await prisma.page.create({
    data: { projectId, url },
  });

  res.json(page);
});

export default router;
