import { Router } from "express";
import { db, generationsTable } from "@workspace/db";
import { sql, count } from "drizzle-orm";

const router = Router();

router.get("/admin/stats", async (req, res) => {
  const password = (req.headers.authorization ?? "").replace(/^Bearer\s+/, "")
    || (req.query.password as string ?? "");

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [totals] = await db
    .select({
      total: count(),
      demo: sql<number>`sum(case when ${generationsTable.isDemo} then 1 else 0 end)::int`,
      real: sql<number>`sum(case when not ${generationsTable.isDemo} then 1 else 0 end)::int`,
    })
    .from(generationsTable);

  const byTemplate = await db
    .select({
      template: generationsTable.templateType,
      count: count(),
    })
    .from(generationsTable)
    .groupBy(generationsTable.templateType)
    .orderBy(sql`count(*) desc`);

  const byDay = await db
    .select({
      date: sql<string>`date(${generationsTable.createdAt})::text`,
      count: count(),
    })
    .from(generationsTable)
    .where(sql`${generationsTable.createdAt} >= now() - interval '14 days'`)
    .groupBy(sql`date(${generationsTable.createdAt})`)
    .orderBy(sql`date(${generationsTable.createdAt}) asc`);

  res.json({
    total: totals?.total ?? 0,
    real: totals?.real ?? 0,
    demo: totals?.demo ?? 0,
    by_template: Object.fromEntries(byTemplate.map(r => [r.template, r.count])),
    by_day: byDay,
  });
});

export default router;
