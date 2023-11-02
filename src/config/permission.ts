export const ALL_PERMISSIONS = [
  // user
  "user:role:write", // Allowed to write to user role
  "user:role:delete", // Allowed to delete role from user

  // post
  "post:read",
  "post:write",
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
  acc[permission] = permission;

  return acc;
}, {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>);

export const USER_ROLE = [PERMISSIONS["post:read"], PERMISSIONS["post:write"]];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_ADMIN: "APPLICATION_ADMIN",
};
