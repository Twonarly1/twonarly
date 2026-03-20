ALTER TABLE "settings" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "settings" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");