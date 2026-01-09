import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET all projects for the logged-in user
router.get("/", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const projects = await prisma.project.findMany({ where: { userId } });
  res.json(projects);
});

// POST create project
router.post("/", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const { name, url } = req.body;
  const project = await prisma.project.create({
    data: { name, url, userId },
  });
  res.json(project);
});

// GET single project
router.get("/:id", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const project = await prisma.project.findFirst({
    where: { id: req.params.id, userId },
  });
  console.log(project,".....");
  if (!project) return res.sendStatus(404);
  res.json(project);
});

// DELETE project
router.delete("/:id", requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  await prisma.project.deleteMany({ where: { id: req.params.id, userId } });
  res.json({ ok: true });
});

export default router;
