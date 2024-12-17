/*
  Warnings:

  - Added the required column `DEMMANDTOTAL` to the `GridLive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GridLive` ADD COLUMN `DEMMANDTOTAL` INTEGER NOT NULL;
