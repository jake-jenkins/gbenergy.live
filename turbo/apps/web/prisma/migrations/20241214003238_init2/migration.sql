/*
  Warnings:

  - You are about to drop the column `INVKL` on the `GridLive` table. All the data in the column will be lost.
  - Added the required column `INTVKL` to the `GridLive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GridLive` DROP COLUMN `INVKL`,
    ADD COLUMN `INTVKL` INTEGER NOT NULL;
