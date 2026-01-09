import { prisma } from "../prisma";

/**
 * Ensures user exists in the DB.
 * If createOnly=true, it won't perform unnecessary updates.
 */
export async function ensureUser(
  decoded: any,
  options: { createOnly?: boolean } = {}
) {
  const userId = decoded.sub;
  const email = decoded.email;

  if (options.createOnly) {
    // Only create if not exists → minimizes DB queries
    const exists = await prisma.user.findUnique({ where: { id: userId } });
    if (!exists) {
      await prisma.user.create({ data: { id: userId, email } });
    }
  } else {
    // Upsert (optional)
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email },
    });
  }
}
