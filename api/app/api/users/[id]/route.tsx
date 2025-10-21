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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return jsonError("Invalid ID format", 400);
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });

    // 1. Check if user exists FIRST
    if (!user) {
      return jsonError("User not found", 404);
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (deletedUser) {
      console.log(
        `Deleted user: ${deletedUser.username} (ID: ${deletedUser.id})`
      );
      return json(
        {
          message: "Deleted user",
          user: deletedUser,
        },
        { status: 200 }
      );
    } else {
      return jsonError("Error deleting user", 400);
    }
  } catch (e: any) {
    console.log("DELETE/api/users error:", e);
    return jsonError("Internal server error", 500);
  }
}
