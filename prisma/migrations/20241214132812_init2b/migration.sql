/*
  Warnings:

  - The primary key for the `GridLive` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `GridLive` table. All the data in the column will be lost.
  - Added the required column `EXPORTTOTAL` to the `GridLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FOSSILTOTAL` to the `GridLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GENERATIONTOTAL` to the `GridLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GREENTOTAL` to the `GridLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IMPORTTOTAL` to the `GridLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PERIOD` to the `GridLive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GridLive` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    ADD COLUMN `EXPORTTOTAL` INTEGER NOT NULL,
    ADD COLUMN `FOSSILTOTAL` INTEGER NOT NULL,
    ADD COLUMN `GENERATIONTOTAL` INTEGER NOT NULL,
    ADD COLUMN `GREENTOTAL` INTEGER NOT NULL,
    ADD COLUMN `IMPORTTOTAL` INTEGER NOT NULL,
    ADD COLUMN `PERIOD` VARCHAR(191) NOT NULL,
    ADD COLUMN `UPDATE` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`UPDATE`);
