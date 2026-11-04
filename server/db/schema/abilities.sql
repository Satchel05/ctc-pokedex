CREATE TABLE "abilities" (
	"id" integer PRIMARY KEY,
	"name" text NOT NULL CONSTRAINT "abilities_name_key" UNIQUE
);