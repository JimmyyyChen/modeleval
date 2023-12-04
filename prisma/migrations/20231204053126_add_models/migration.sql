/*
  Warnings:

  - A unique constraint covering the columns `[labelName]` on the table `Label` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[modelName]` on the table `Models` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Label_labelName_key` ON `Label`(`labelName`);

-- CreateIndex
CREATE UNIQUE INDEX `Models_modelName_key` ON `Models`(`modelName`);
