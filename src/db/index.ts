import { env } from "@/lib/env"
import { drizzle } from "drizzle-orm/libsql"

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_SECRET,
  },
})
