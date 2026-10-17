CREATE TABLE users (
	"uid" varchar(255),
	"name" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "team_pkey" PRIMARY KEY("uid")
);
