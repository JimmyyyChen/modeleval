-- DropIndex
DROP INDEX `Testing_userId_fkey` ON `Testing`;

-- AlterTable
ALTER TABLE `Testing` MODIFY `userId` VARCHAR(191) NOT NULL;
