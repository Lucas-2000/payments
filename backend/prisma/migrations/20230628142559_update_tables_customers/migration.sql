/*
  Warnings:

  - You are about to drop the column `customersId` on the `companies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_customersId_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "customersId";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "companiesId" TEXT;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
