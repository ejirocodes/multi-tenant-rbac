import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const createApplicationBodySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export type createApplicationBody = z.infer<typeof createApplicationBodySchema>;

export const createApplicationJsonSchema = {
  body: zodToJsonSchema(
    createApplicationBodySchema,
    "createApplicationJsonSchema"
  ),
};
