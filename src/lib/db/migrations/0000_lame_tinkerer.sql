CREATE TABLE IF NOT EXISTS "file" (
	"id" varchar PRIMARY KEY NOT NULL,
	"metadata" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyValues" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" json
);
