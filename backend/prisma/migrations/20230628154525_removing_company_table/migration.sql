/*
  Warnings:

  - You are about to drop the column `companyId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_userId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_companyId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_companyId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "companyId";

-- DropTable
DROP TABLE "companies";
