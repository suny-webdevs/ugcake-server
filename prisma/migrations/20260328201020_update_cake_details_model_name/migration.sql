/*
  Warnings:

  - You are about to drop the `cake_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cake_details" DROP CONSTRAINT "cake_details_orderId_fkey";

-- DropTable
DROP TABLE "cake_details";

-- CreateTable
CREATE TABLE "cake_order_details" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "flavour" "FLAVOUR" NOT NULL,
    "isEggLess" BOOLEAN NOT NULL DEFAULT false,
    "isLessCream" BOOLEAN NOT NULL DEFAULT false,
    "isExtraJuicy" BOOLEAN NOT NULL DEFAULT false,
    "shape" "SHAPE" NOT NULL,
    "icingType" "ICING_TYPE" NOT NULL,
    "icingColor" "ICING_COLOR" NOT NULL,
    "tiers" "TIERS" NOT NULL,
    "height" "HEIGHT" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cake_order_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cake_order_details_orderId_key" ON "cake_order_details"("orderId");

-- AddForeignKey
ALTER TABLE "cake_order_details" ADD CONSTRAINT "cake_order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
