/*
  Warnings:

  - You are about to alter the column `userId` on the `testing` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `the_userId` to the `Testing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dataset` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `testing` ADD COLUMN `the_userId` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Testing` ADD CONSTRAINT `Testing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dataset` ADD CONSTRAINT `Dataset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
