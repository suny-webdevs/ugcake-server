-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER', 'DELIVERY_MAN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "CAKE_TYPE" AS ENUM ('CUPCAKE', 'CAKE');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PAYMENT_METHOD" AS ENUM ('CASH_ON_DELIVERY', 'ONLINE');

-- CreateEnum
CREATE TYPE "FLAVOUR" AS ENUM ('BLACKFOREST', 'VANILLA', 'WHITEFOREST', 'CLASSIC_CHOCOLATE', 'BUTTERSCOTCH', 'PINEAPPLE', 'STRAWBERRY', 'BLUEBERRY', 'CHOCOVANILLA', 'CRUNCHY_BUTTERSCOTCH', 'CHOCOLATE_TRUFFLE', 'MANGO', 'HAZELNUT', 'OPERA', 'RED_VELVET', 'OREO', 'MOCHA', 'RASMALAI', 'SUGERFREE_VANILLA', 'MIX_FRUITS', 'CHOCO_BERRY', 'CHOCOLATE_OVERLOAD');

-- CreateEnum
CREATE TYPE "SHAPE" AS ENUM ('ROUND', 'SQUARE', 'RECTANGULAR', 'HEART', 'OVAL');

-- CreateEnum
CREATE TYPE "ICING_TYPE" AS ENUM ('BUTTERCREAM', 'FONDANT', 'ROYAL_ICING', 'CREAM_CHEESE', 'GANACHE');

-- CreateEnum
CREATE TYPE "ICING_COLOR" AS ENUM ('BLUE', 'PINK', 'RED', 'WHITE', 'PURPLE', 'YELLOW', 'ORANGE', 'GRAY', 'DARK_CHOCOLATE', 'BROWN', 'CREAM', 'BLACK', 'LAVENDER', 'MINT_GREEN', 'LIGHT_PINK', 'LIGHT_BLUE', 'MULTI_COLOR', 'GOLD', 'SILVER');

-- CreateEnum
CREATE TYPE "TIERS" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "HEIGHT" AS ENUM ('NORMAL', 'TALL', 'EXTRA_TALL');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cakes" (
    "id" UUID NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "categoryId" UUID NOT NULL,
    "type" "CAKE_TYPE" NOT NULL,
    "customizable" BOOLEAN NOT NULL DEFAULT false,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "size" VARCHAR(255),
    "flavour" VARCHAR(255),
    "soldAmount" INTEGER NOT NULL DEFAULT 0,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cake_features" (
    "id" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "specificationLabel" TEXT[],
    "specificationValue" TEXT[],
    "features" TEXT[],
    "nutritionLabel" TEXT[],
    "nutritionValue" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cake_features_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PAYMENT_METHOD" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cakes_sku_key" ON "cakes"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "cakes_slug_key" ON "cakes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cake_features_cakeId_key" ON "cake_features"("cakeId");

-- CreateIndex
CREATE UNIQUE INDEX "cake_order_details_orderId_key" ON "cake_order_details"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "orders_userId_cakeId_idx" ON "orders"("userId", "cakeId");

-- CreateIndex
CREATE INDEX "ratings_userId_cakeId_idx" ON "ratings"("userId", "cakeId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cakes" ADD CONSTRAINT "cakes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake_features" ADD CONSTRAINT "cake_features_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake_order_details" ADD CONSTRAINT "cake_order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
