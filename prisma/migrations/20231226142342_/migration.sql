/*
  Warnings:

  - You are about to drop the column `userid` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userImage` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userid_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `userid`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userImage`,
    ADD COLUMN `commentId` INTEGER NULL,
    ADD COLUMN `userImageUrl` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
