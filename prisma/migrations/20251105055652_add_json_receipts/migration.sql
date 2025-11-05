-- CreateTable
CREATE TABLE "MintReceiptJson" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "txHash" TEXT NOT NULL,
    "raw" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MintReceiptJson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MintReceiptJson_txHash_key" ON "MintReceiptJson"("txHash");

-- CreateIndex
CREATE INDEX "MintReceiptJson_userId_idx" ON "MintReceiptJson"("userId");

-- CreateIndex
CREATE INDEX "MintReceiptJson_txHash_idx" ON "MintReceiptJson"("txHash");

-- AddForeignKey
ALTER TABLE "MintReceiptJson" ADD CONSTRAINT "MintReceiptJson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
