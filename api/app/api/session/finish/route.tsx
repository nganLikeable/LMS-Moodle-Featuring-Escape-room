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
    const { gameId, currentLevel } = await request.json();

    if (!gameId) {
      return jsonError("Missing game Id", 400);
    }

    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: { finishTime: new Date() },
    });

    return json({ message: "Game finished", game: updatedGame });
  } catch (e: any) {
    console.error("Finish route error:", e);
    return jsonError("Failed to finish game", 500);
  }
}
