import { application } from "./../../db/schema";
import { InferInsertModel, and, eq } from "drizzle-orm";
import { db } from "../../db";
import { role, user, userToRole } from "../../db/schema";
import * as argon2 from "argon2";

export async function createUser(data: InferInsertModel<typeof user>) {
  const hashedPassword = await argon2.hash(data.password, {
    type: argon2.argon2id,
  });

  const result = await db
    .insert(user)
    .values({
      ...data,
      password: hashedPassword,
    })
    .returning({
      id: user.id,
      name: user.name,
      email: user.email,
      applicationId: user.applicationId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

  return result[0];
}

export async function getUserByApplication(applicationId: string) {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.applicationId, applicationId));

  return result;
}

export async function assignRoleToUser(
  data: InferInsertModel<typeof userToRole>
) {
  const result = await db.insert(userToRole).values(data).returning();

  return result[0];
}

export async function getUserByEmail({
  email,
  applicationId,
}: {
  email: string;
  applicationId: string;
}) {
  const result = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      applicationId: user.applicationId,
      roleId: role.id,
      password: user.password,
      permissions: role.permissions,
    })
    .from(user)
    .where(and(eq(user.email, email), eq(user.applicationId, applicationId)))
    .leftJoin(
      userToRole,
      and(
        eq(userToRole.userId, user.id),
        eq(userToRole.applicationId, applicationId)
      )
    )
    .leftJoin(role, eq(role.id, userToRole.roleId));

  const users = result.reduce((acc, curr) => {
    if (!acc.id) {
      return {
        ...curr,
        permissions: new Set(curr.permissions),
      };
    }

    if (!curr.permissions) {
      return acc;
    }

    for (const permission of curr.permissions) {
      acc.permissions.add(permission);
    }

    return acc;
  }, {} as Omit<(typeof result)[number], "permissions"> & { permissions: Set<string> });

  if (!result.length) {
    return null;
  }

  return {
    ...users,
    permissions: Array.from(users.permissions),
  };
}
