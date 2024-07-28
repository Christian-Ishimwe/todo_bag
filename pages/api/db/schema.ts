import { text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: text("id").primaryKey(),
  task: text("task").notNull(),
  done: boolean("done").default(false).notNull(),
  usermail: text("usermail").notNull()
});
