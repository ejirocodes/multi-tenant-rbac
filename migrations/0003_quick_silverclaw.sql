CREATE TABLE IF NOT EXISTS "userToRole" (
	"applicationId" uuid NOT NULL,
	"roleId" uuid NOT NULL,
	"userId" uuid NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_roleId_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
