/*
  Warnings:

  - You are about to drop the column `the_userId` on the `testing` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `dataset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `testing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `dataset` DROP FOREIGN KEY `Dataset_userId_fkey`;

-- DropForeignKey
ALTER TABLE `testing` DROP FOREIGN KEY `Testing_userId_fkey`;

-- AlterTable
ALTER TABLE `dataset` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `testing` DROP COLUMN `the_userId`,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user`;
