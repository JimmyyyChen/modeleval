/*
  Warnings:

  - You are about to drop the `_choicequestiontodataset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_datasettoshortanswerquestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_choicequestiontodataset` DROP FOREIGN KEY `_ChoiceQuestionToDataset_A_fkey`;

-- DropForeignKey
ALTER TABLE `_choicequestiontodataset` DROP FOREIGN KEY `_ChoiceQuestionToDataset_B_fkey`;

-- DropForeignKey
ALTER TABLE `_datasettoshortanswerquestion` DROP FOREIGN KEY `_DatasetToShortAnswerQuestion_A_fkey`;

-- DropForeignKey
ALTER TABLE `_datasettoshortanswerquestion` DROP FOREIGN KEY `_DatasetToShortAnswerQuestion_B_fkey`;

-- AlterTable
ALTER TABLE `choicequestion` ADD COLUMN `datasetId` INTEGER NULL;

-- AlterTable
ALTER TABLE `shortanswerquestion` ADD COLUMN `datasetId` INTEGER NULL;

-- DropTable
DROP TABLE `_choicequestiontodataset`;

-- DropTable
DROP TABLE `_datasettoshortanswerquestion`;

-- AddForeignKey
ALTER TABLE `ChoiceQuestion` ADD CONSTRAINT `ChoiceQuestion_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShortAnswerQuestion` ADD CONSTRAINT `ShortAnswerQuestion_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
