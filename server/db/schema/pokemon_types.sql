CREATE TABLE "pokemon_types" (
	"pokemon_id" integer,
	"type_id" smallint,
	"slot" smallint NOT NULL,
	CONSTRAINT "pokemon_types_pkey" PRIMARY KEY("pokemon_id","type_id")
);