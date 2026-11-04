CREATE TABLE "pokemon" (
	"id" integer PRIMARY KEY,
	"name" text NOT NULL CONSTRAINT "pokemon_name_key" UNIQUE,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"base_experience" integer,
	"is_default" boolean DEFAULT true NOT NULL,
	"sprite_url" text,
	"artwork_url" text,
	"artwork_hq_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);