/*
  Warnings:

  - You are about to drop the column `companiesId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `companiesId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `customersId` on the `invoices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_companiesId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_companiesId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customersId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "companiesId",
ADD COLUMN     "companyId" TEXT;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "companiesId",
DROP COLUMN "customersId",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "customerId" TEXT;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
