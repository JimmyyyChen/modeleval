-- AlterTable
ALTER TABLE `comment` ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT 'Administrator';

-- AlterTable
ALTER TABLE `dataset` ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT 'Administrator';
