import { FastifyInstance } from "fastify";
import { createUserJsonSchema, loginToJsonSchema } from "./user.schema";
import { createUserHandler, loginHandler } from "./user.controller";

export async function userRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createUserJsonSchema,
    },
    createUserHandler
  );
  app.post(
    "/login",
    {
      schema: loginToJsonSchema,
    },
    loginHandler
  );
}
