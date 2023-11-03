import { FastifyReply, FastifyRequest } from "fastify";
import { createUserBody } from "./user.schema";
import { SYSTEM_ROLES } from "../../config/permission";
import { getRoleByName } from "./user.service";

export async function createUserHandler(
  request: FastifyRequest<{ Body: createUserBody }>,
  reply: FastifyReply
) {
  const { initialUser, ...data } = request.body;

  initialUser ? SYSTEM_ROLES.SUPER_ADMIN : SYSTEM_ROLES.APPLICATION_ADMIN;

  const role = await getRoleByName({
    applicationId: data.applicationId,
    name: data.name,
  });

  reply.send(role);
}
