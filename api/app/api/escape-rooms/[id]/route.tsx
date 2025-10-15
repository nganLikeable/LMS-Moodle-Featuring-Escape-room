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

export async function POST(request: NextRequest) {
  try {
    const { id, userId, currentLevel, completed } = await request.json();

    if (!id || !userId || !currentLevel || !completed) {
      return jsonError("User and level information required", 400);
    }

    // check if session exists
    const gameSession = await prisma.gameSession.findUnique({ where: { id } });

    if (gameSession) {
      return jsonError("Level exists", 409);
    }

    // create new game session
    const newSession = await prisma.gameSession.create({
      data: { userId: userId, currentLevel: currentLevel },
    });

    return json(newSession, { status: 200 });
  } catch (e: any) {
    console.log("Loading level error", e);
    return jsonError("Internal Server Error", 500);
  }
}
