import { seed } from "drizzle-seed";
import db, { sql } from "@/db/index";
import { resources, usersSync } from "@/db/schema";

const SEED_COUNT = 10;
const SEED = 1337;

async function main() {
  try {
    console.log(`🌱 Starting DB seed with seed ${SEED}...`);

    console.log("🧹 Truncating resources table and restarting identity...");
    await sql.query("TRUNCATE TABLE resources RESTART IDENTITY CASCADE;");

    console.log("🔎 Querying existing users...");
    let users = await db
      .select({ id: usersSync.id })
      .from(usersSync)
      .orderBy(usersSync.id);

    if (users.length === 0) {
      console.log("👤 No users found, inserting default seed user...");
      await db.insert(usersSync).values({
        id: "seed-user-001",
        name: "Seed User",
        email: "seed@example.com",
      });
      users = [{ id: "seed-user-001" }];
    }

    const ids = users.map((u) => u.id);
    console.log(`👥 Using ${users.length} user(s)`);

    console.log("🍩 Seeding with drizzle-seed...");
    await seed(db, { resources }, { seed: SEED }).refine((funcs) => ({
      resources: {
        count: SEED_COUNT,
        columns: {
          authorId: funcs.valuesFromArray({ values: ids, isUnique: false }),
          content: funcs.loremIpsum({ sentencesCount: 4 }),
          title: funcs.loremIpsum({ sentencesCount: 1 }),
          imageUrl: funcs.default({ defaultValue: null }),
          published: funcs.default({ defaultValue: true }),
          slug: funcs.string({ isUnique: true }),
        },
        updatedAt: funcs.timestamp(),
        createdAt: funcs.timestamp(),
      },
    }));

    console.log(`✅ Inserted ${SEED_COUNT} resource(s) into the database\n`);

    try {
      await sql.query(
        `SELECT setval(pg_get_serial_sequence('resources','id'), COALESCE((SELECT MAX(id) FROM resources), 1), true);`,
      );
      console.log("✅ Sequence synced after seeding");
    } catch (err) {
      console.warn("⚠️ Failed to sync resources sequence after seeding:", err);
    }
  } catch (err) {
    console.error("💥 Seed failed:", err);
    process.exit(1);
  }
}

void main();
