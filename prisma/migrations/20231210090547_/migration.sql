/*
  Warnings:

  - You are about to drop the `_datasettolabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_labeltomodels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `models` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `datasetId` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelsModelid` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_datasettolabel` DROP FOREIGN KEY `_DatasetToLabel_A_fkey`;

-- DropForeignKey
ALTER TABLE `_datasettolabel` DROP FOREIGN KEY `_DatasetToLabel_B_fkey`;

-- DropForeignKey
ALTER TABLE `_labeltomodels` DROP FOREIGN KEY `_LabelToModels_A_fkey`;

-- DropForeignKey
ALTER TABLE `_labeltomodels` DROP FOREIGN KEY `_LabelToModels_B_fkey`;

-- AlterTable
ALTER TABLE `label` ADD COLUMN `datasetId` INTEGER NOT NULL,
    ADD COLUMN `modelsModelid` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_datasettolabel`;

-- DropTable
DROP TABLE `_labeltomodels`;

-- DropTable
DROP TABLE `models`;

-- CreateTable
CREATE TABLE `Model` (
    `modelid` INTEGER NOT NULL AUTO_INCREMENT,
    `modelName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'this is a model for testing',
    `downloadN` INTEGER NOT NULL DEFAULT 0,
    `likeN` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Model_modelName_key`(`modelName`),
    PRIMARY KEY (`modelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_modelsModelid_fkey` FOREIGN KEY (`modelsModelid`) REFERENCES `Model`(`modelid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
