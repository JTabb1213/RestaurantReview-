DROP TABLE IF EXISTS "users" CASCADE;
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
                                  "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
                                  "username" character varying(255),
                                  "passwrd" character varying(255),
                                  "email" character varying(255),
                                  "createdAt" timestamptz NOT NULL,
                                  "updatedAt" timestamptz NOT NULL,
                                  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

DROP TABLE IF EXISTS "reviews" CASCADE;
DROP SEQUENCE IF EXISTS reviews_id_seq;
CREATE SEQUENCE reviews_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."reviews"(
                                "id" integer DEFAULT nextval('reviews_id_seq') NOT NULL,
                                "user_id" INTEGER REFERENCES "public"."users"("id") NOT NULL,
                                "restaurant_id" INTEGER NOT NULL,
                                "review_text" TEXT,
                                "createdAt" timestamptz NOT NULL,
                                "updatedAt" timestamptz NOT NULL,
                                CONSTRAINT "reviews_pkey" PRIMARY KEY ("id"),
                                CONSTRAINT "reviews_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id")
) WITH (oids = false);

