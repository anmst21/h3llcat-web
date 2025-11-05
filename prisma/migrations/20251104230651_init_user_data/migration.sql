-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "email" TEXT,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_did_key" ON "UserData"("did");
