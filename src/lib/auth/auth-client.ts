import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import {
  ac,
  adminRole,
  lecturerRole,
  studentRole,
  userRole,
} from "./permission"

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        user: userRole,
        admin: adminRole,
        student: studentRole,
        lecturer: lecturerRole,
      },
    }),
  ],
})
