/*
  Warnings:

  - You are about to drop the column `additionalImages` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `flavors` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `isCustomizable` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `isSale` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `isSpecial` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `isTrending` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `specificationLabel` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `specificationValue` on the `cakes` table. All the data in the column will be lost.
  - You are about to drop the column `weights` on the `cakes` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `maxRating` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `cakes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentMethod` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER', 'DELIVERY_MAN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "CAKE_TYPE" AS ENUM ('CUPCAKE', 'CAKE');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PAYMENT_METHOD" AS ENUM ('CASH_ON_DELIVERY', 'ONLINE');

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_cakeId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_cakeId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_cakeId_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_userId_fkey";

-- DropIndex
DROP INDEX "cakes_id_key";

-- DropIndex
DROP INDEX "orders_id_key";

-- DropIndex
DROP INDEX "ratings_cakeId_key";

-- DropIndex
DROP INDEX "ratings_id_key";

-- AlterTable
ALTER TABLE "cakes" DROP COLUMN "additionalImages",
DROP COLUMN "avatar",
DROP COLUMN "features",
DROP COLUMN "flavors",
DROP COLUMN "isActive",
DROP COLUMN "isCustomizable",
DROP COLUMN "isNew",
DROP COLUMN "isSale",
DROP COLUMN "isSpecial",
DROP COLUMN "isTrending",
DROP COLUMN "specificationLabel",
DROP COLUMN "specificationValue",
DROP COLUMN "weights",
ADD COLUMN     "customizable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "flavour" VARCHAR(255),
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "size" VARCHAR(255),
ADD COLUMN     "soldAmount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "type",
ADD COLUMN     "type" "CAKE_TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "quantity" DROP DEFAULT,
DROP COLUMN "status",
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PAYMENT_METHOD" NOT NULL;

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "maxRating",
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "review" DROP NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "carts";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "phone" VARCHAR(255),
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cake_features" (
    "id" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "specificationsLabel" TEXT[],
    "specificationValue" TEXT[],
    "features" TEXT[],
    "nutritionLabel" TEXT[],
    "nutritionValue" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cake_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "cakes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cake_features_cakeId_key" ON "cake_features"("cakeId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake_features" ADD CONSTRAINT "cake_features_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
