import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./schema/*",
  out: "./drizzle",
  dialect: 'mysql',
  dbCredentials: {
    user: "user",
    password: "password",
    host: "127.0.0.1",
    port: 3306,
    database: "facts_db",
  }
});