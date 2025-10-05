ALTER TABLE "bookmarks" ALTER COLUMN "xata.createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "bookmarks" ALTER COLUMN "xata.updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_accounts" ALTER COLUMN "xata.createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_accounts" ALTER COLUMN "xata.updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_sessions" ALTER COLUMN "xata.createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_sessions" ALTER COLUMN "xata.updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_users" ALTER COLUMN "xata.createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_users" ALTER COLUMN "xata.updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_verificationtokens" ALTER COLUMN "xata.createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "nextauth_verificationtokens" ALTER COLUMN "xata.updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "xata.createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "xata.updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "bookmarks" DROP COLUMN "xata.version";--> statement-breakpoint
ALTER TABLE "nextauth_accounts" DROP COLUMN "xata.version";--> statement-breakpoint
ALTER TABLE "nextauth_sessions" DROP COLUMN "xata.version";--> statement-breakpoint
ALTER TABLE "nextauth_users" DROP COLUMN "xata.version";--> statement-breakpoint
ALTER TABLE "nextauth_verificationtokens" DROP COLUMN "xata.version";--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN "xata.version";