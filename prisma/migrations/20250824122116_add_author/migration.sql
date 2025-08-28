/*
  Warnings:

  - Added the required column `author` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `deletedAt` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "author" TEXT NOT NULL,
ALTER COLUMN "deletedAt" SET NOT NULL;
