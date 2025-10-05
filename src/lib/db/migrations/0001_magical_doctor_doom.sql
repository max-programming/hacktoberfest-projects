ALTER TABLE "nextauth_users_accounts" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "nextauth_users_sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "nextauth_users_accounts" CASCADE;--> statement-breakpoint
DROP TABLE "nextauth_users_sessions" CASCADE;--> statement-breakpoint
ALTER TABLE "nextauth_users" RENAME COLUMN "emailverified" TO "emailVerified";--> statement-breakpoint
ALTER TABLE "nextauth_accounts" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "nextauth_accounts" RENAME COLUMN "provideraccountid" TO "providerAccountId";--> statement-breakpoint
ALTER TABLE "nextauth_sessions" RENAME COLUMN "sessiontoken" TO "sessionToken";--> statement-breakpoint
ALTER TABLE "nextauth_sessions" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "reports" RENAME COLUMN "repoid" TO "repoId";--> statement-breakpoint
ALTER TABLE "reports" RENAME COLUMN "repoauthor" TO "repoAuthor";--> statement-breakpoint
ALTER TABLE "reports" RENAME COLUMN "repourl" TO "repoUrl";--> statement-breakpoint
ALTER TABLE "reports" DROP CONSTRAINT "reports_repoid_key";--> statement-breakpoint
ALTER TABLE "reports" DROP CONSTRAINT "reports_repourl_key";--> statement-breakpoint
ALTER TABLE "nextauth_accounts" DROP CONSTRAINT "nextauth_accounts_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "nextauth_sessions" DROP CONSTRAINT "nextauth_sessions_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "reports" DROP CONSTRAINT "reports_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "nextauth_accounts" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextauth_accounts" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextauth_verificationtokens" ALTER COLUMN "identifier" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextauth_verificationtokens" ALTER COLUMN "token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextauth_verificationtokens" ALTER COLUMN "expires" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextauth_sessions" ALTER COLUMN "expires" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextauth_accounts" ADD CONSTRAINT "nextauth_accounts_userId_nextauth_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_sessions" ADD CONSTRAINT "nextauth_sessions_userId_nextauth_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_nextauth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_nextauth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nextauth_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nextauth_sessions" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_repoId_unique" UNIQUE("repoId");--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_repoUrl_unique" UNIQUE("repoUrl");