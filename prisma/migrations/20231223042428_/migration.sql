/*
  Warnings:

  - You are about to drop the column `repeatNames` on the `model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dataset` ADD COLUMN `repeatNames` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `model` DROP COLUMN `repeatNames`;
