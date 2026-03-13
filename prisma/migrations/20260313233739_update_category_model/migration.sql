/*
  Warnings:

  - You are about to drop the column `category` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `cakes` on the `categories` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `cakes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cakes" DROP COLUMN "category",
ADD COLUMN     "categoryId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "cakes";

-- AddForeignKey
ALTER TABLE "cakes" ADD CONSTRAINT "cakes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
