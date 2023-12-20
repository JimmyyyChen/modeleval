-- CreateTable
CREATE TABLE `Label` (
    `labelid` INTEGER NOT NULL AUTO_INCREMENT,
    `labelName` VARCHAR(191) NOT NULL,
    `modelsModelid` INTEGER NULL,
    `datasetId` INTEGER NULL,

    UNIQUE INDEX `Label_labelName_key`(`labelName`),
    PRIMARY KEY (`labelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `modelid` INTEGER NOT NULL AUTO_INCREMENT,
    `modelName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'this is a model for testing',
<<<<<<<< HEAD:prisma/migrations/20231220081350_/migration.sql
    `downloadN` INTEGER NOT NULL DEFAULT 0,
    `likeN` INTEGER NOT NULL DEFAULT 0,
========
    `downloadCount` INTEGER NOT NULL DEFAULT 0,
    `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `starCount` INTEGER NOT NULL DEFAULT 0,
>>>>>>>> d6f507de8a3a69ec14be337c0da33b562082d7d3:prisma/migrations/20231219025913_/migration.sql
    `ScoreObj` DOUBLE NOT NULL DEFAULT 0.0,
    `ScoreSub` DOUBLE NOT NULL DEFAULT 0.0,

    UNIQUE INDEX `Model_modelName_key`(`modelName`),
    PRIMARY KEY (`modelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dataset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datasetName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'this is a dataset for task',
    `sizeInMB` DOUBLE NOT NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `starCount` INTEGER NOT NULL DEFAULT 0,
    `downloadCount` INTEGER NOT NULL DEFAULT 0,
    `questionType` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChoiceQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `correctAnswer` VARCHAR(191) NOT NULL,
    `datasetId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShortAnswerQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `sampleAnswer` TEXT NOT NULL,
    `datasetId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Choice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `choiceQuestionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `taskName` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NULL,
    `questionType` INTEGER NOT NULL,
    `modelIds` JSON NOT NULL,
    `datasetId` INTEGER NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 0,
    `progress` DOUBLE NOT NULL DEFAULT 0,
    `answerjson` JSON NOT NULL,
<<<<<<<< HEAD:prisma/migrations/20231220081350_/migration.sql
    `scoresjson` JSON NOT NULL,
    `modelscoreIdjson` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `score` DOUBLE NOT NULL DEFAULT 0.0,
    `scoreType` INTEGER NOT NULL,
    `modelId` INTEGER NOT NULL,
    `datasetId` INTEGER NOT NULL,
    `progress` INTEGER NOT NULL DEFAULT 0,
    `correctCount` INTEGER NOT NULL DEFAULT 0,
    `totalCount` INTEGER NOT NULL DEFAULT 0,
========
    `state` INTEGER NOT NULL,
    `progress` DOUBLE NOT NULL,
    `scoresjson` JSON NOT NULL,
>>>>>>>> d6f507de8a3a69ec14be337c0da33b562082d7d3:prisma/migrations/20231219025913_/migration.sql

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `commentTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` INTEGER NOT NULL,
    `modelId` INTEGER NULL,
    `datasetId` INTEGER NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adversarial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `taskName` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NULL,
    `modelIds` JSON NOT NULL,
    `datasetId` INTEGER NOT NULL,
    `taskJson` JSON NOT NULL,
    `scoresJson` JSON NOT NULL,
<<<<<<<< HEAD:prisma/migrations/20231220081350_/migration.sql
========

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NULL,
    `adversarialId` INTEGER NULL,
    `score` DOUBLE NOT NULL DEFAULT 0.0,
    `scoreType` INTEGER NOT NULL,
    `mainModelId` INTEGER NOT NULL,
    `datasetId` INTEGER NOT NULL,
    `adModelId` INTEGER NULL,
    `correctCount` INTEGER NOT NULL,
    `totalCount` INTEGER NOT NULL,
>>>>>>>> d6f507de8a3a69ec14be337c0da33b562082d7d3:prisma/migrations/20231219025913_/migration.sql

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ModelToTask` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModelToTask_AB_unique`(`A`, `B`),
    INDEX `_ModelToTask_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_modelsModelid_fkey` FOREIGN KEY (`modelsModelid`) REFERENCES `Model`(`modelid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `Label_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoiceQuestion` ADD CONSTRAINT `ChoiceQuestion_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShortAnswerQuestion` ADD CONSTRAINT `ShortAnswerQuestion_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_choiceQuestionId_fkey` FOREIGN KEY (`choiceQuestionId`) REFERENCES `ChoiceQuestion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`modelid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelToTask` ADD CONSTRAINT `_ModelToTask_A_fkey` FOREIGN KEY (`A`) REFERENCES `Model`(`modelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelToTask` ADD CONSTRAINT `_ModelToTask_B_fkey` FOREIGN KEY (`B`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
