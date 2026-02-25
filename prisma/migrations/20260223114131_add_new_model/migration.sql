/*
  Warnings:

  - You are about to drop the column `image` on the `cakes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `cakes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatar` to the `cakes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `cakes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cakes" DROP COLUMN "image",
ADD COLUMN     "additionalImages" TEXT[],
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "sku" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "specifications" (
    "id" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "maxRating" INTEGER NOT NULL DEFAULT 5,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specifications_id_key" ON "specifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "specifications_cakeId_key" ON "specifications"("cakeId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_id_key" ON "ratings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_cakeId_key" ON "ratings"("cakeId");

-- CreateIndex
CREATE INDEX "ratings_userId_cakeId_idx" ON "ratings"("userId", "cakeId");

-- CreateIndex
CREATE UNIQUE INDEX "cakes_sku_key" ON "cakes"("sku");

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
