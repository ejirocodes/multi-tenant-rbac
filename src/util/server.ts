import fastify from "fastify";
import { logger } from "./logger";
import { applicationRoute } from "../module/application/application.route";
import { userRoute } from "../module/user/user.route";

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app.route({
    method: "GET",
    url: "/health",
    handler: async () => {
      return { status: "ok" };
    },
  });
  app.register(applicationRoute, {
    prefix: "/api/application",
  });
  app.register(userRoute, {
    prefix: "/api/user",
  });
  return app;
}
