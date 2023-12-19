/*
  Warnings:

  - You are about to drop the column `downloadN` on the `model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `model` DROP COLUMN `downloadN`,
    ADD COLUMN `downloadCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
