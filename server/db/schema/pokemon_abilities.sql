CREATE TABLE "pokemon_abilities" (
	"pokemon_id" integer,
	"ability_id" integer,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"slot" smallint NOT NULL,
	CONSTRAINT "pokemon_abilities_pkey" PRIMARY KEY("pokemon_id","ability_id")
);