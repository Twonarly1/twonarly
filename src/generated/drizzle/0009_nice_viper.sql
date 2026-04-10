CREATE TABLE "user_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"sidebar_position" text DEFAULT 'left' NOT NULL,
	"sidebar_variant" text DEFAULT 'inset' NOT NULL,
	"sidebar_collapsible" text DEFAULT 'none' NOT NULL,
	"use_pointer_cursor" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_settings_userId_idx" ON "user_settings" USING btree ("user_id");