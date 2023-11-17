import { z } from "zod";
import { ALL_PERMISSIONS } from "../../config/permission";
import zodToJsonSchema from "zod-to-json-schema";

export const createRoleBodySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  permissions: z.array(z.enum(ALL_PERMISSIONS)),
  applicationId: z.string({ required_error: "Application is required" }).uuid(),
});

export type createRoleBody = z.infer<typeof createRoleBodySchema>;

export const createRoleJsonSchema = {
  body: zodToJsonSchema(createRoleBodySchema, "createRoleBodySchema"),
};
