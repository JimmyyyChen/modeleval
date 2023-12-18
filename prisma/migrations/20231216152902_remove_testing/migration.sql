/*
  Warnings:

  - You are about to drop the `Testing` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Dataset` MODIFY `description` VARCHAR(191) NOT NULL DEFAULT 'this is a dataset for task';

-- AlterTable
ALTER TABLE `Model` MODIFY `description` VARCHAR(191) NOT NULL DEFAULT 'this is a model for task';

-- DropTable
DROP TABLE `Testing`;
