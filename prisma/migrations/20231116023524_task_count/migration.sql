/*
  Warnings:

  - You are about to drop the column `completeTask` on the `Testing` table. All the data in the column will be lost.
  - You are about to drop the column `totalTask` on the `Testing` table. All the data in the column will be lost.
  - Added the required column `completedTaskCount` to the `Testing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskCount` to the `Testing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Testing` DROP COLUMN `completeTask`,
    DROP COLUMN `totalTask`,
    ADD COLUMN `completedTaskCount` INTEGER NOT NULL,
    ADD COLUMN `taskCount` INTEGER NOT NULL;
