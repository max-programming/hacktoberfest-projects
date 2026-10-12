CREATE TABLE "nextauth_users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"emailverified" timestamp,
	"name" varchar(255),
	"image" varchar(255),
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "nextauth_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"type" varchar(100),
	"provider" varchar(100),
	"provideraccountid" varchar(255),
	"refresh_token" varchar(255),
	"access_token" varchar(255),
	"expires_at" integer,
	"token_type" varchar(100),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "nextauth_verificationtokens" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" varchar(255),
	"token" varchar(255),
	"expires" timestamp,
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "nextauth_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"sessiontoken" varchar(255),
	"expires" timestamp,
	"user_id" text,
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "nextauth_users_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"account_id" text,
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "nextauth_users_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"session_id" text,
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" text PRIMARY KEY NOT NULL,
	"repoid" integer,
	"repoauthor" varchar(255),
	"message" text DEFAULT 'No Message' NOT NULL,
	"user_id" text,
	"valid" boolean DEFAULT true NOT NULL,
	"repourl" varchar(255),
	"xata.createdAt" timestamp with time zone,
	"xata.updatedAt" timestamp with time zone,
	"xata.version" smallint,
	CONSTRAINT "reports_repoid_key" UNIQUE("repoid"),
	CONSTRAINT "reports_repourl_key" UNIQUE("repourl")
);
--> statement-breakpoint
ALTER TABLE "nextauth_accounts" ADD CONSTRAINT "nextauth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_sessions" ADD CONSTRAINT "nextauth_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_users_accounts" ADD CONSTRAINT "nextauth_users_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_users_accounts" ADD CONSTRAINT "nextauth_users_accounts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."nextauth_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_users_sessions" ADD CONSTRAINT "nextauth_users_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_users_sessions" ADD CONSTRAINT "nextauth_users_sessions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."nextauth_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE set null ON UPDATE no action;