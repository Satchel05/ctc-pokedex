CREATE TABLE "users" (
	"uid" varchar(255) PRIMARY KEY,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"email" varchar(255),
	"role" text DEFAULT 'spectator' NOT NULL,
	CONSTRAINT "users_role_check" CHECK ((role = ANY (ARRAY['trainer'::text, 'spectator'::text])))
);