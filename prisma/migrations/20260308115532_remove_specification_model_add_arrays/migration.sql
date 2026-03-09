/*
  Warnings:

  - You are about to drop the `specifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_cakeId_fkey";

-- AlterTable
ALTER TABLE "cakes" ADD COLUMN     "specificationLabel" TEXT[],
ADD COLUMN     "specificationValue" TEXT[];

-- DropTable
DROP TABLE "specifications";
