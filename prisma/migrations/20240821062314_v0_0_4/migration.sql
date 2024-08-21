/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "user" (
    "user_seq" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_seq")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
