-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "cakes" ADD COLUMN     "flavors" TEXT[],
ADD COLUMN     "weights" TEXT[];
