/*
  Warnings:

  - You are about to drop the `test_model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `test_model`;

-- CreateTable
CREATE TABLE `Label` (
    `labelid` INTEGER NOT NULL AUTO_INCREMENT,
    `labelName` VARCHAR(191) NOT NULL,
    `modelsModelid` INTEGER NULL,

    PRIMARY KEY (`labelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Models` (
    `modelid` INTEGER NOT NULL AUTO_INCREMENT,
    `modelName` VARCHAR(191) NOT NULL,
    `downloadN` INTEGER NOT NULL DEFAULT 0,
    `likeN` INTEGER NOT NULL,

    PRIMARY KEY (`modelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_modelsModelid_fkey` FOREIGN KEY (`modelsModelid`) REFERENCES `Models`(`modelid`) ON DELETE SET NULL ON UPDATE CASCADE;
