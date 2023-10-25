import { FastifyReply, FastifyRequest } from "fastify";
import { createApplicationBody } from "./application.schema";
import { createApplication } from "./application.service";

export async function createApplicationHandler(
  request: FastifyRequest<{
    Body: createApplicationBody;
  }>,
  reply: FastifyReply
) {
  const { name } = request.body;

  const application = createApplication({ name });
  reply.send({ application });
}
