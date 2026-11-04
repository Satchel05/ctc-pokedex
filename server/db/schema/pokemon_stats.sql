CREATE TABLE "pokemon_stats" (
	"pokemon_id" integer,
	"stat_id" smallint,
	"base_stat" integer NOT NULL,
	"effort" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "pokemon_stats_pkey" PRIMARY KEY("pokemon_id","stat_id")
);