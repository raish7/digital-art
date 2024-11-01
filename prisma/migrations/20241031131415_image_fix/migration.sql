-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_artworkId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "artworkId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE SET NULL ON UPDATE CASCADE;
