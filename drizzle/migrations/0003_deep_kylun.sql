CREATE TABLE IF NOT EXISTS "image" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"carousel" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"user_id" text,
	"name" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"is_approved" boolean DEFAULT false NOT NULL,
	"review_date" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
