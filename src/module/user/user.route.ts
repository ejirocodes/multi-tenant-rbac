import { FastifyInstance } from "fastify";
import { createUserJsonSchema } from "./user.schema";
import { createUserHandler } from "./user.controller";

export async function userRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createUserJsonSchema,
    },
    createUserHandler
  );
}
