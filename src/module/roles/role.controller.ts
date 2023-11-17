import { FastifyReply, FastifyRequest } from "fastify";
import { createRoleBody } from "./role.schema";
import { createRole } from "./roles.service";

export async function createRoleHandler(
  request: FastifyRequest<{
    Body: createRoleBody;
  }>,
  reply: FastifyReply
) {
  const { name, applicationId, permissions } = request.body;

  const result = await createRole({
    name,
    applicationId,
    permissions,
  });

  return result;
}
