import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";
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
    // get username and pw from client's request (ex: login form)
    const { username, password } = await request.json();

    if (!username || !password) {
      return jsonError("Username and password required", 400);
    }

    // get data from db
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return jsonError("Invalid username or password", 401);
    }

    // compare password as hashes
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return jsonError("Invalid username or password", 401);
    }

    // create real jwt
    const token = signToken({ id: user.id, username: user.username });

    // if successful login, return user's data w/o the hashed pw
    const { passwordHash, ...userWithoutPassword } = user;
    return NextResponse.json(
      { user: userWithoutPassword, token: token },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Login error", error);
    return jsonError("Internal Server Error", 500);
  }
}
