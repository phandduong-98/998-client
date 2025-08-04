import { createAccessControl, Statements } from "better-auth/plugins/access"

export enum Roles {
  STUDENT = "student",
  LECTURER = "lecturer",
  ADMIN = "admin",
}

export type Role = `${Roles}`

export const statement: Statements = {
  project: ["yah", "hurh", "skrt"],
} as const

export const ac = createAccessControl(statement)

export const userRole = ac.newRole({
  user: ["set-role"],
})

export const adminRole = ac.newRole({
  project: ["yah", "hurh", "skrt"],
})

export const studentRole = ac.newRole({
  project: ["yah", "hurh"],
})

export const lecturerRole = ac.newRole({
  project: ["skrt"],
})
