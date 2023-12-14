-- CreateTable
CREATE TABLE `Testing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sizeInMB` DOUBLE NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NULL,
    `taskCount` INTEGER NOT NULL,
    `completedTaskCount` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Label` (
    `labelid` INTEGER NOT NULL AUTO_INCREMENT,
    `labelName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Label_labelName_key`(`labelName`),
    PRIMARY KEY (`labelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Dataset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datasetName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'this is a dataset for testing',
    `sizeInMB` DOUBLE NOT NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `starCount` INTEGER NOT NULL DEFAULT 0,
    `downloadCount` INTEGER NOT NULL DEFAULT 0,
    `questionType` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChoiceQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `correctAnswer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShortAnswerQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `sampleAnswer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Choice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
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
    `answers` JSON NOT NULL,
    `state` INTEGER NOT NULL,
    `progress` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LabelToModel` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LabelToModel_AB_unique`(`A`, `B`),
    INDEX `_LabelToModel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ModelToTask` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModelToTask_AB_unique`(`A`, `B`),
    INDEX `_ModelToTask_B_index`(`B`)
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
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_choiceQuestionId_fkey` FOREIGN KEY (`choiceQuestionId`) REFERENCES `ChoiceQuestion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_datasetId_fkey` FOREIGN KEY (`datasetId`) REFERENCES `Dataset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LabelToModel` ADD CONSTRAINT `_LabelToModel_A_fkey` FOREIGN KEY (`A`) REFERENCES `Label`(`labelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LabelToModel` ADD CONSTRAINT `_LabelToModel_B_fkey` FOREIGN KEY (`B`) REFERENCES `Model`(`modelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelToTask` ADD CONSTRAINT `_ModelToTask_A_fkey` FOREIGN KEY (`A`) REFERENCES `Model`(`modelid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelToTask` ADD CONSTRAINT `_ModelToTask_B_fkey` FOREIGN KEY (`B`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
