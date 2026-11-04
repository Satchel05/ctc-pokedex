CREATE TABLE "stats" (
	"id" smallint PRIMARY KEY,
	"name" text NOT NULL CONSTRAINT "stats_name_key" UNIQUE
);