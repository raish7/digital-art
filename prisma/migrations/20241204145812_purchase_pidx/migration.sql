/*
  Warnings:

  - A unique constraint covering the columns `[pidx]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "pidx" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_pidx_key" ON "Purchase"("pidx");
