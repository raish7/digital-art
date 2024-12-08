/*
  Warnings:

  - Made the column `pidx` on table `Purchase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "pidx" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
