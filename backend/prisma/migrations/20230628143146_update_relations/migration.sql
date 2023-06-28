/*
  Warnings:

  - Added the required column `userId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
