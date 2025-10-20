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

export async function POST(request: NextRequest) {
  try {
    // verify auth token
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

    const authenticatedUserId = Number(decodedToken.sub);
    const { userId } = await request.json(); // parse the incoming request body

    if (!userId) {
      return jsonError("User Id required to start a session", 400);
    }

    // convert id to int
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return jsonError("Invalid userId format", 400);
    }
    // ensure user can only start sessions for themselves
    if (authenticatedUserId !== parsedUserId) {
      return jsonError(
        "Unauthorized: You can only start sessions for yourself",
        403
      );
    }

    const newGame = await prisma.game.create({
      data: {
        userId: parsedUserId,
        currentLevel: 1,
        status: GameStatus.IN_PROGRESS,
      },
    });

    return json(
      { message: "New game started", game: newGame },
      { status: 201 }
    );
  } catch (e: any) {
    console.log("POST/api/session/start error: ", e);
    return jsonError("Internal server error. Failed to create game", 500);
  }
}
