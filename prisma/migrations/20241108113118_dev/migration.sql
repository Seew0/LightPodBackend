/*
  Warnings:

  - You are about to drop the column `imageID` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `containerID` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "imageID",
ADD COLUMN     "containerID" TEXT NOT NULL;
