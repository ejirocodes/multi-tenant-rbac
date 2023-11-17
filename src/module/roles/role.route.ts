import { FastifyInstance } from "fastify";
import { createRoleJsonSchema } from "./role.schema";
import { createRoleHandler } from "./role.controller";

export async function roleRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createRoleJsonSchema,
    },
    createRoleHandler
  );
}
