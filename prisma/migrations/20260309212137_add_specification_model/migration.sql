-- CreateTable
CREATE TABLE "specifications" (
    "id" UUID NOT NULL,
    "cakeId" UUID NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specifications_id_key" ON "specifications"("id");
