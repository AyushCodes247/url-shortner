CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other', 'prefer_not_to_say');--> statement-breakpoint
CREATE TABLE "urls" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"url_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"user_id" bigint NOT NULL,
	"original_url" varchar(2048) NOT NULL,
	"short_code" varchar(20) NOT NULL,
	"title" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"click_count" integer DEFAULT 0 NOT NULL,
	"share_count" integer DEFAULT 0 NOT NULL,
	"expiration_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "urls_url_id_unique" UNIQUE("url_id"),
	CONSTRAINT "urls_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"public_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"gender" "gender" DEFAULT 'prefer_not_to_say' NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"last_login_at" timestamp with time zone,
	"email_verified_at" timestamp with time zone,
	CONSTRAINT "users_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
CREATE UNIQUE INDEX "urls_short_code_idx" ON "urls" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "urls_user_id_idx" ON "urls" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "urls_active_idx" ON "urls" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "urls_expiration_idx" ON "urls" USING btree ("expiration_date");--> statement-breakpoint
CREATE INDEX "urls_user_active_idx" ON "urls" USING btree ("user_id","is_active");