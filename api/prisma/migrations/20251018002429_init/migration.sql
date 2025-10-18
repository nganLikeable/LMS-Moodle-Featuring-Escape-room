/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completedChapters` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `timeCompleted` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `GameSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastUpdated` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."GameSession" DROP CONSTRAINT "GameSession_userId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "completedChapters",
DROP COLUMN "gameId",
DROP COLUMN "timeCompleted",
ADD COLUMN     "currentLevel" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "finishTime" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'IN_PROGRESS',
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."GameSession";
