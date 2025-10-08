import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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
      return new NextResponse("Username and password required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // get data from db
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return new NextResponse(
        "Invalid username or password",
        { status: 401, headers: corsHeaders } // 401 unauthorized
      );
    }

    // compare password as hashes
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return new NextResponse("Invalid username or password.", {
        status: 401,
        headers: corsHeaders,
      });
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
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
