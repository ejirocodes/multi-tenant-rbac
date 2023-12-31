import { FastifyReply, FastifyRequest } from "fastify";
import { createUserBody, loginBody } from "./user.schema";
import { SYSTEM_ROLES } from "../../config/permission";
import { getRoleByName } from "../roles/roles.service";
import {
  assignRoleToUser,
  createUser,
  getUserByApplication,
  getUserByEmail,
} from "./user.service";
import { generateJwToken } from "../../util/token.util";

export async function createUserHandler(
  request: FastifyRequest<{ Body: createUserBody }>,
  reply: FastifyReply
) {
  const { initialUser, ...data } = request.body;

  const roleName = initialUser
    ? SYSTEM_ROLES.SUPER_ADMIN
    : SYSTEM_ROLES.APPLICATION_ADMIN;

  if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
    const appUser = await getUserByApplication(data.applicationId);
    if (appUser.length > 0) {
      reply.status(400).send({
        message: "Application already has a super admin",
        extensions: {
          code: "APPLICATION_ALREADY_SUPER_USER",
          applicationId: data.applicationId,
        },
      });
    }
  }

  const role = await getRoleByName({
    name: roleName,
    applicationId: data.applicationId,
  });

  if (!role) {
    reply.status(400).send({
      message: "Role does not exist",
      extensions: {
        code: "ROLE_DOES_NOT_EXIST",
        applicationId: data.applicationId,
      },
    });
  }

  try {
    const user = await createUser(data);

    await assignRoleToUser({
      applicationId: data.applicationId,
      roleId: role.id,
      userId: user.id,
    });

    reply.send(user);
  } catch (error) {}

  reply.send(role);
}

export async function loginHandler(
  request: FastifyRequest<{ Body: loginBody }>,
  reply: FastifyReply
) {
  const { email, password, applicationId } = request.body;

  const user = await getUserByEmail({ email, applicationId });

  if (!user) {
    return reply.status(400).send({
      message: "Invalid email or password",
      extensions: {
        code: "INVALID_CREDENTIALS",
      },
    });
  }

  const token = generateJwToken({
    email,
    applicationId,
    scopes: user.permissions,
    id: user.id,
  });

  return {
    token,
  };
}
