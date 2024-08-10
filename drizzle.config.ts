import { defineConfig } from "drizzle-kit";
import dbConfig from './dbConfig.js'
export default defineConfig({
  schema: "./schema/*",
  out: "./drizzle",
  dialect: 'mysql',
  dbCredentials: dbConfig
});