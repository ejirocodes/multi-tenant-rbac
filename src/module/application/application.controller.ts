import { FastifyReply, FastifyRequest } from "fastify";
import { createApplicationBody } from "./application.schema";
import { createApplication, getApplication } from "./application.service";
import { createRole } from "../roles/roles.service";
import {
  ALL_PERMISSIONS,
  SYSTEM_ROLES,
  USER_ROLE_PERMISSION,
} from "../../config/permission";

export async function createApplicationHandler(
  request: FastifyRequest<{
    Body: createApplicationBody;
  }>,
  reply: FastifyReply
) {
  const { name } = request.body;

  const application = await createApplication({ name });

  const superAdminRolePromise = await createRole({
    name: SYSTEM_ROLES.SUPER_ADMIN,
    applicationId: application.id,
    permissions: ALL_PERMISSIONS as unknown as Array<string>,
  });

  const applicationUserRolePromise = await createRole({
    applicationId: application.id,
    name: SYSTEM_ROLES.APPLICATION_ADMIN,
    permissions: USER_ROLE_PERMISSION,
  });

  const [superAdminRole, applicationUserRole] = await Promise.allSettled([
    superAdminRolePromise,
    applicationUserRolePromise,
  ]);

  if (superAdminRole.status === "rejected") {
    throw new Error(superAdminRole.reason);
  }

  if (applicationUserRole.status === "rejected") {
    throw new Error(applicationUserRole.reason);
  }

  reply.send({
    application,
    superAdminRole: superAdminRole.value,
    applicationUserRole: applicationUserRole.value,
  });
}

export async function getApplicationsHandler() {
  return await getApplication();
}
