import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createUserBodySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Not a valid email",
  }),
  applicationId: z.string({ required_error: "Application is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  initialUser: z.boolean().optional(),
});

export type createUserBody = z.infer<typeof createUserBodySchema>;

export const createUserJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, "createUserBodySchema"),
};
