/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "User" (
    "user_seq" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_seq")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
