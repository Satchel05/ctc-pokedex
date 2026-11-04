CREATE TABLE "user_pokemon" (
	"user_uid" varchar(255),
	"pokemon_id" integer,
	"added_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_pokemon_pkey" PRIMARY KEY("user_uid","pokemon_id")
);