DO $$ BEGIN
 CREATE TYPE "fileType" AS ENUM('image');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"storagePath" varchar PRIMARY KEY NOT NULL,
	"metadata" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyValues" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"synopsis" text DEFAULT '' NOT NULL,
	"imagePath" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productions" ADD CONSTRAINT "productions_imagePath_file_storagePath_fk" FOREIGN KEY ("imagePath") REFERENCES "file"("storagePath") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
