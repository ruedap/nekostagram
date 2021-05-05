/*
  Warnings:

  - Added the required column `updatedAt` to the `Neko` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageFileNameOriginal` to the `Neko` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Neko" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "imageFileNameOriginal" TEXT NOT NULL,
ADD COLUMN     "imageFileExt" TEXT;
