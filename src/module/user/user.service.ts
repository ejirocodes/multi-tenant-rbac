import { InferInsertModel, and, eq } from "drizzle-orm";
import { db } from "../../db";
import { role, user } from "../../db/schema";
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

export async function getRoleByName({
  name,
  applicationId,
}: {
  name: string;
  applicationId: string;
}) {
  const result = await db
    .select()
    .from(role)
    .where(and(eq(role.name, name), eq(role.applicationId, applicationId)));

  return result[0];
}
