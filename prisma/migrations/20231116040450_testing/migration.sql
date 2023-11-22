/*
  Warnings:

  - You are about to drop the column `size` on the `Testing` table. All the data in the column will be lost.
  - Added the required column `sizeInMB` to the `Testing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Testing` DROP COLUMN `size`,
    ADD COLUMN `sizeInMB` INTEGER NOT NULL,
    MODIFY `endTime` DATETIME(3) NULL;
