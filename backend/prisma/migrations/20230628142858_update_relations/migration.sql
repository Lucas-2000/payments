/*
  Warnings:

  - Made the column `companiesId` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_companiesId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "companiesId" SET NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
