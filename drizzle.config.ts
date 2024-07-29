import "dotenv/config";
import { defineConfig } from "drizzle-kit";
const DATABASE_URL=process.env.DATABASE_URL || ""
export default defineConfig({
  schema: "./pages/api/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
