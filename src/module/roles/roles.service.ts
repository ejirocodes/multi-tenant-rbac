import { InferInsertModel, and, eq } from "drizzle-orm";
import { db } from "../../db";
import { role } from "../../db/schema";

export async function createRole(data: InferInsertModel<typeof role>) {
  const result = await db.insert(role).values(data).returning();

  return result[0];
}

export async function getRoleByName({
  name,
  applicationId,
}: {
  name: string;
  applicationId: string;
}) {
  console.log({ name, applicationId });
  const result = await db
    .select()
    .from(role)
    .where(and(eq(role.name, name), eq(role.applicationId, applicationId)))
    .limit(1);

  return result[0];
}
