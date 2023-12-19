/*
  Warnings:

  - You are about to drop the column `taskOneId` on the `Adversarial` table. All the data in the column will be lost.
  - You are about to drop the column `taskTwoId` on the `Adversarial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Adversarial` DROP COLUMN `taskOneId`,
    DROP COLUMN `taskTwoId`,
    ADD COLUMN `taskJson` JSON NOT NULL;

-- AlterTable
ALTER TABLE `Model` ADD COLUMN `ScoreObj` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `ScoreSub` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `scoresjson` JSON NOT NULL;

-- CreateTable
CREATE TABLE `Score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NULL,
    `score` DOUBLE NOT NULL DEFAULT 0.0,
    `scoreType` INTEGER NOT NULL,
    `mainModelId` INTEGER NOT NULL,
    `datasetId` INTEGER NOT NULL,
    `adModelId` INTEGER NULL,
    `correctCount` INTEGER NOT NULL,
    `totalCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
