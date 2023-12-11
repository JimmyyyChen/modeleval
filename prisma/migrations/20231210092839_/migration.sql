-- DropForeignKey
ALTER TABLE `label` DROP FOREIGN KEY `Label_datasetId_fkey`;

-- DropForeignKey
ALTER TABLE `label` DROP FOREIGN KEY `Label_modelsModelid_fkey`;

-- AlterTable
ALTER TABLE `label` MODIFY `datasetId` INTEGER NULL,
    MODIFY `modelsModelid` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_modelsModelid_fkey` FOREIGN KEY (`modelsModelid`) REFERENCES `Model`(`modelid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
