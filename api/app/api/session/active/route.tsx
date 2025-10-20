import { verifyToken } from "@/lib/auth";
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

export async function GET(request: NextRequest) {
  try {
    // verify authentication token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return jsonError("Authentication required", 401);
    }

    const token = authHeader.substring(7);
    const decodedToken = verifyToken(token);
    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !decodedToken.sub
    ) {
      return jsonError("Invalid or expired token", 401);
    }

    const authenticaedUserId = Number(decodedToken.sub);

    // find user's current active game - last game in the array
    const activeGame = await prisma.game.findFirst({
      where: {
        userId: authenticaedUserId,
        status: GameStatus.IN_PROGRESS,
      },
      orderBy: {
        id: "desc",
      },
    });

    if (!activeGame) {
      return json({
        hasActiveGame: false,
        game: null,
        message: "No active game found",
      });
    } else {
      return json({
        hasActiveGame: true,
        game: activeGame,
        message: "Active game found",
      });
    }
  } catch (e: any) {
    console.log("GET/api/session/activeGame error:", e);
    return jsonError("Internal server error", 500);
  }
}
