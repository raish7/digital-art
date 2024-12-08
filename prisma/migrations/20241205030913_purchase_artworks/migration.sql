/*
  Warnings:

  - You are about to drop the column `artworkId` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_artworkId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "artworkId";

-- CreateTable
CREATE TABLE "PurchaseArtwork" (
    "id" SERIAL NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "artworkId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseArtwork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseArtwork" ADD CONSTRAINT "PurchaseArtwork_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseArtwork" ADD CONSTRAINT "PurchaseArtwork_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
