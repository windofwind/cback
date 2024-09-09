/*
  Warnings:

  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile_snapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."company";

-- DropTable
DROP TABLE "public"."user";

-- DropTable
DROP TABLE "public"."user_profile";

-- DropTable
DROP TABLE "public"."user_profile_snapshot";

-- CreateTable
CREATE TABLE "user" (
    "seq" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "seq" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "seq" TEXT NOT NULL,
    "nick" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "user_profile_snapshot" (
    "id" UUID NOT NULL,
    "seq" TEXT NOT NULL,
    "nick" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_profile_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_seq_key" ON "company"("seq");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_seq_fkey" FOREIGN KEY ("seq") REFERENCES "user"("seq") ON DELETE NO ACTION ON UPDATE NO ACTION;
