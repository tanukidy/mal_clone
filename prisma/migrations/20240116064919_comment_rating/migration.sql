/*
  Warnings:

  - Added the required column `rating` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `anime_title` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `rating` VARCHAR(191) NOT NULL,
    MODIFY `anime_title` VARCHAR(191) NOT NULL;
