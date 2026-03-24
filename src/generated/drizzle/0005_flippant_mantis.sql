CREATE TABLE "passkey" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"public_key" text NOT NULL,
	"user_id" text NOT NULL,
	"credential_id" text NOT NULL,
	"counter" text NOT NULL,
	"device_type" text NOT NULL,
	"backed_up" boolean NOT NULL,
	"transports" text,
	"createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "passkey_credential_id_unique" UNIQUE("credential_id")
);
--> statement-breakpoint
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "passkey_userId_idx" ON "passkey" USING btree ("user_id");