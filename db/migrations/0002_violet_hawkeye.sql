CREATE TABLE "block" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" text NOT NULL,
	"title" text,
	"url" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_userName_page_userName_fk" FOREIGN KEY ("userName") REFERENCES "public"."page"("userName") ON DELETE no action ON UPDATE no action;