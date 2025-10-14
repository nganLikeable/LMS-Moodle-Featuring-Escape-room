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
    const {
      creatorId,
      title,
      description,
      timerDuration,
      backgroundImg,
      stages,
    } = await request.json();

    if (
      !creatorId ||
      !title ||
      !description ||
      !timerDuration ||
      !backgroundImg ||
      stages.length === 0
    ) {
      return jsonError("Missing required room or stage data");
    }
    const room = await prisma.room.create({
      data: {
        creatorId: creatorId,
        title: title,
        description: description,
        timerDuration: timerDuration,
        backgroundImg: backgroundImg,
        stages: {
          createMany: {
            data: stages.map((stage: any) => ({
              stageNo: stage.stageNo,
              question: stage.question,
              answer: stage.answer,
              inputFile: stage.inputFile || null,
            })),
          },
        },
      },
      // by default, only returns all the fields except stages as its created separely from Room => include in the response
      include: { stages: true },
    });
    return json(room, { status: 201 });
  } catch (e: any) {
    console.log("POST/api/escape-room/create error: ", e);
    return jsonError(e.message, 500);
  }
}

// get room by Id
export async function GET(request: NextRequest) {
  try {
    const idParam = request.nextUrl.searchParams.get("roomId");

    if (idParam) {
      const roomId = parseInt(idParam, 10);
      const room = await prisma.room.findUnique({
        where: { roomId },
        include: { stages: true },
      });

      if (!room) {
        return jsonError("Room not found", 404);
      }
      return json(room, { status: 200 });
    }
  } catch (e: any) {
    console.log(e);
    return jsonError("Server error", 500);
  }
}
