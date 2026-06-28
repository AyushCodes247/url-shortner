import { createInsertSchema } from "drizzle-orm/zod";
import { userTable } from "@db/user.schema";

export const registerSchemaValidator = createInsertSchema(userTable, {
  name: (schema) => schema.min(2).max(255),

  email: (schema) => schema.email(),

  password: (schema) =>
    schema
      .min(8)
      .max(255)
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
}).omit({
  id: true,
  publicId: true,
  isVerified: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  lastLoginAt: true,
  emailVerifiedAt: true,
});
