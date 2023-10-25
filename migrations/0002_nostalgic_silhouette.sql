CREATE TABLE IF NOT EXISTS "role" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"applicationId" uuid,
	"permissions" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT role_name_applicationId PRIMARY KEY("name","applicationId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "role_id_index" ON "role" ("id");
DO $$ BEGIN
 ALTER TABLE "role" ADD CONSTRAINT "role_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
