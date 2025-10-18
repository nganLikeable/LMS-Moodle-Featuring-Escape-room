import { GameStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// helper function to return a json response
function json<T>(
  data: T,
  init?: { status?: number; headers?: Record<string, string> }
) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: { ...corsHeaders, ...(init?.headers || {}) },
  });
}

// helper function for error objs
function jsonError(message: string, status = 400) {
  return json({ error: message }, { status });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
export async function PATCH(request: NextRequest) {
  try {
    const { gameId, currentLevel, status } = await request.json(); // parse the incoming request body

    if (!gameId) {
      return jsonError("Missing game Id", 400);
    }

    // convert id from string to int
    const parsedGameId = parseInt(gameId);
    if (isNaN(parsedGameId)) {
      return jsonError("Invalid gameId format", 400);
    }
    // hardcode no stages. If not reach and finish last stage yet
    if (currentLevel < 5) {
      const newLevel = currentLevel + 1;
      const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: {
          currentLevel: newLevel,
        },
      });
      return json(updatedGame, { status: 200 });
    } else if (currentLevel === 5) {
      const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: {
          status: GameStatus.COMPLETED,
        },
      });
      return json(updatedGame, { status: 200 });
    }
  } catch (e: any) {
    console.error(e);
    return jsonError("Invalid request", 400);
  }
}
