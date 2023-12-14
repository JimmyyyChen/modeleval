/*
  Warnings:

  - You are about to drop the column `answers` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `answers`,
    ADD COLUMN `answerjson` JSON NOT NULL;
