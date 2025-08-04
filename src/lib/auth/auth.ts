import { db } from "@/db"
import * as schema from "@/db/schema"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin } from "better-auth/plugins"
import { env } from "../env"
import {
  ac,
  adminRole,
  lecturerRole,
  studentRole,
  userRole,
} from "./permission"

export const auth = betterAuth({
  plugins: [
    admin({
      ac,
      roles: {
        user: userRole,
        admin: adminRole,
        student: studentRole,
        lecturer: lecturerRole,
      },
    }),
  ],
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
})
