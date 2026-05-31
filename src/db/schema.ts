import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Users (synced from Stack Auth)
// ---------------------------------------------------------------------------
export const usersSync = pgTable("usersSync", {
  id: text("id").primaryKey(), // Stack Auth user ID
  name: text("name"),
  email: text("email"),
});
export type User = typeof usersSync.$inferSelect;

// ---------------------------------------------------------------------------
// Example resource table — rename or replace with your own domain model.
// This table is intentionally generic. The seed script populates it with
// placeholder data so you can verify the full stack is wired up correctly
// before you start building your actual features.
// ---------------------------------------------------------------------------
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  summary: text("summary"),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => usersSync.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

const schema = { resources, usersSync };
export default schema;

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
