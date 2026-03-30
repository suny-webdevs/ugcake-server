/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `cakes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `cakes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cakes" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cakes_slug_key" ON "cakes"("slug");
