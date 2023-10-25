import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const application = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const user = pgTable(
  "user",
  {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => application.id),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (user) => {
    return {
      cpk: primaryKey(user.email, user.applicationId),
      idIndex: uniqueIndex("user_id_index").on(user.id),
    };
  }
);

export const role = pgTable(
  "role",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => application.id),
    permissions: text("permissions").array().$type<Array<string>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (role) => {
    return {
      cpk: primaryKey(role.name, role.applicationId),
      idIndex: uniqueIndex("role_id_index").on(role.id),
    };
  }
);

export const userToRole = pgTable(
  "userToRole",
  {
    applicationId: uuid("applicationId")
      .references(() => application.id)
      .notNull(),
    roleId: uuid("roleId")
      .references(() => role.id)
      .notNull(),
    userId: uuid("userId")
      .references(() => user.id)
      .notNull(),
  },
  (userToRole) => {
    return {
      cpk: primaryKey(
        userToRole.applicationId,
        userToRole.roleId,
        userToRole.userId
      ),
    };
  }
);
