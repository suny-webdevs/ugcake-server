/*
  Warnings:

  - You are about to drop the column `specificationsLabel` on the `cake_features` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cake_features" DROP COLUMN "specificationsLabel",
ADD COLUMN     "specificationLabel" TEXT[];
