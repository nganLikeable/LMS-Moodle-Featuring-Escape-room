import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../lib/auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json<T>(data: T, init?: { status?: number; headers?: Record<string, string> }) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: { ...corsHeaders, ...(init?.headers || {}) },
  });
}

function jsonError(message: string, status = 400) {
  return json({ error: message }, { status });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// POST: Start or continue game session
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonError("Authorization required", 401);
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token) as any;
    if (!decoded) {
      return jsonError("Invalid token", 401);
    }

    const roomId = parseInt(params.id);
    if (isNaN(roomId)) {
      return jsonError("Invalid room ID", 400);
    }

    // Check if room exists and is playable
    const room = await prisma.room.findUnique({
      where: { roomId },
      include: {
        stages: { orderBy: { stageNo: "asc" } },
      },
    });

    if (!room) {
      return jsonError("Room not found", 404);
    }

    if (room.stages.length === 0) {
      return jsonError("Room has no stages", 400);
    }

    // Check for existing active session
    let session = await prisma.escapeRoomSession.findFirst({
      where: {
        userId: decoded.sub,
        roomId,
        status: "IN_PROGRESS",
      },
      include: {
        stageProgress: true,
      },
    });

    if (!session) {
      // Create new session
      session = await prisma.escapeRoomSession.create({
        data: {
          userId: decoded.sub,
          roomId,
          currentStageId: room.stages[0].stageId,
          timeRemaining: room.timerDuration * 60, // Convert minutes to seconds
        },
        include: {
          stageProgress: true,
        },
      });

      // Increment play count
      await prisma.room.update({
        where: { roomId },
        data: { playCount: { increment: 1 } },
      });
    }

    // Get current stage details
    const currentStage = room.stages.find(s => s.stageId === session.currentStageId) || room.stages[0];

    return json({
      session: {
        id: session.id,
        currentStageId: session.currentStageId,
        timeRemaining: session.timeRemaining,
        score: session.score,
        hintsUsed: session.hintsUsed,
        status: session.status,
      },
      room: {
        roomId: room.roomId,
        title: room.title,
        description: room.description,
        backgroundImg: room.backgroundImg,
        totalStages: room.stages.length,
      },
      currentStage: {
        stageId: currentStage.stageId,
        stageNo: currentStage.stageNo,
        title: currentStage.title,
        description: currentStage.description,
        question: currentStage.question,
        stageType: currentStage.stageType,
        codeSnippet: currentStage.codeSnippet,
        imageUrl: currentStage.imageUrl,
        hints: currentStage.hints,
        maxAttempts: currentStage.maxAttempts,
        pointValue: currentStage.pointValue,
      },
      progress: session.stageProgress,
    });
  } catch (error) {
    console.error("Error starting/continuing session:", error);
    return jsonError("Failed to start session", 500);
  }
}