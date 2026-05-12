-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "telegramGroupId" TEXT NOT NULL,
    "priceAmount" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userWallet" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "txSignature" TEXT NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "Subscription_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_telegramGroupId_key" ON "Project"("telegramGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_txSignature_key" ON "Subscription"("txSignature");
