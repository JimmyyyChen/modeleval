-- AlterTable
ALTER TABLE `user` ADD COLUMN `modelModelid` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_modelModelid_fkey` FOREIGN KEY (`modelModelid`) REFERENCES `Model`(`modelid`) ON DELETE SET NULL ON UPDATE CASCADE;
