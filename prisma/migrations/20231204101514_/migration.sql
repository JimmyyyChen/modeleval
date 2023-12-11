/*
  Warnings:

  - You are about to drop the column `datasetId` on the `choicequestion` table. All the data in the column will be lost.
  - You are about to alter the column `sizeInMB` on the `dataset` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `Datasetid` on the `label` table. All the data in the column will be lost.
  - You are about to drop the column `modelsModelid` on the `label` table. All the data in the column will be lost.
  - You are about to drop the column `datasetId` on the `shortanswerquestion` table. All the data in the column will be lost.
  - You are about to alter the column `sizeInMB` on the `testing` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- DropForeignKey
ALTER TABLE `choicequestion` DROP FOREIGN KEY `ChoiceQuestion_datasetId_fkey`;

-- DropForeignKey
ALTER TABLE `label` DROP FOREIGN KEY `Label_Datasetid_fkey`;

-- DropForeignKey
ALTER TABLE `label` DROP FOREIGN KEY `Label_modelsModelid_fkey`;

-- DropForeignKey
ALTER TABLE `shortanswerquestion` DROP FOREIGN KEY `ShortAnswerQuestion_datasetId_fkey`;

-- AlterTable
ALTER TABLE `choicequestion` DROP COLUMN `datasetId`;

-- AlterTable
ALTER TABLE `dataset` MODIFY `sizeInMB` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `label` DROP COLUMN `Datasetid`,
    DROP COLUMN `modelsModelid`;

-- AlterTable
ALTER TABLE `shortanswerquestion` DROP COLUMN `datasetId`;

-- AlterTable
ALTER TABLE `testing` MODIFY `sizeInMB` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `_LabelToModels` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LabelToModels_AB_unique`(`A`, `B`),
    INDEX `_LabelToModels_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DatasetToLabel` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DatasetToLabel_AB_unique`(`A`, `B`),
    INDEX `_DatasetToLabel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DatasetToShortAnswerQuestion` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DatasetToShortAnswerQuestion_AB_unique`(`A`, `B`),
    INDEX `_DatasetToShortAnswerQuestion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChoiceQuestionToDataset` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChoiceQuestionToDataset_AB_unique`(`A`, `B`),
    INDEX `_ChoiceQuestionToDataset_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LabelToModels` ADD CONSTRAINT `_LabelToModels_A_fkey` FOREIGN KEY (`A`) REFERENCES `Label`(`labelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LabelToModels` ADD CONSTRAINT `_LabelToModels_B_fkey` FOREIGN KEY (`B`) REFERENCES `Models`(`modelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatasetToLabel` ADD CONSTRAINT `_DatasetToLabel_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dataset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatasetToLabel` ADD CONSTRAINT `_DatasetToLabel_B_fkey` FOREIGN KEY (`B`) REFERENCES `Label`(`labelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatasetToShortAnswerQuestion` ADD CONSTRAINT `_DatasetToShortAnswerQuestion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dataset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatasetToShortAnswerQuestion` ADD CONSTRAINT `_DatasetToShortAnswerQuestion_B_fkey` FOREIGN KEY (`B`) REFERENCES `ShortAnswerQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChoiceQuestionToDataset` ADD CONSTRAINT `_ChoiceQuestionToDataset_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChoiceQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChoiceQuestionToDataset` ADD CONSTRAINT `_ChoiceQuestionToDataset_B_fkey` FOREIGN KEY (`B`) REFERENCES `Dataset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
