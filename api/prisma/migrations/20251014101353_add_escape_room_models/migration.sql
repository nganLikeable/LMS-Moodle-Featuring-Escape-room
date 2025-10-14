-- CreateEnum
CREATE TYPE "RoomDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'EXPERT');

-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('CODE_FORMAT', 'DEBUG_IMAGE', 'CODE_GENERATION', 'DATA_TRANSFORMATION', 'MULTIPLE_CHOICE', 'TEXT_INPUT');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'FAILED', 'ABANDONED');

-- CreateTable
CREATE TABLE "EscapeRoomSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "currentStageId" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "timeRemaining" INTEGER,
    "hintsUsed" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "status" "SessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',

    CONSTRAINT "EscapeRoomSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageProgress" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "stageId" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "hintsUsed" INTEGER NOT NULL DEFAULT 0,
    "userAnswer" TEXT,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "StageProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timerDuration" INTEGER NOT NULL,
    "backgroundImg" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "difficulty" "RoomDifficulty" NOT NULL DEFAULT 'MEDIUM',
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "averageCompletionTime" INTEGER,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Stage" (
    "stageId" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "stageNo" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "stageType" "StageType" NOT NULL DEFAULT 'TEXT_INPUT',
    "codeSnippet" TEXT,
    "imageUrl" TEXT,
    "hints" TEXT[],
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "pointValue" INTEGER NOT NULL DEFAULT 100,
    "inputFile" TEXT,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("stageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StageProgress_sessionId_stageId_key" ON "StageProgress"("sessionId", "stageId");

-- AddForeignKey
ALTER TABLE "EscapeRoomSession" ADD CONSTRAINT "EscapeRoomSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapeRoomSession" ADD CONSTRAINT "EscapeRoomSession_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageProgress" ADD CONSTRAINT "StageProgress_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "EscapeRoomSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageProgress" ADD CONSTRAINT "StageProgress_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("stageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
