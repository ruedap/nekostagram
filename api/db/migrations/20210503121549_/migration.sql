/*
  Warnings:

  - Added the required column `imageFileName` to the `Neko` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Neko" ADD COLUMN     "imageFileName" TEXT NOT NULL;
