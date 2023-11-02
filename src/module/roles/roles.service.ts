import { InferInsertModel } from "drizzle-orm";
import { db } from "../../db";
import { role } from "../../db/schema";

export async function createRole(data: InferInsertModel<typeof role>) {
  const result = await db.insert(role).values(data).returning();

  return result[0];
}
