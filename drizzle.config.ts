import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./schema/*",
  out: "./drizzle",
  dialect: 'mysql',
  dbCredentials: {
    user: "mistersa",
    password: "Fuckyou1.",
    host: "50.87.150.19",
    database: "mistersa_hello_svelte",
  }
});