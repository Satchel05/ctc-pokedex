CREATE TABLE "types" (
	"id" smallint PRIMARY KEY,
	"name" text NOT NULL CONSTRAINT "types_name_key" UNIQUE
);