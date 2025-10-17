import bcrypt from "bcryptjs";
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

// GET: get user(s) by id
export async function GET(request: NextRequest) {
  try {
    const idParam = request.nextUrl.searchParams.get("id");

    if (idParam) {
      // convert string.idParram to integer for prisma query
      const id = parseInt(idParam, 10);
      const user = await prisma.user.findUnique({
        where: { id },
      });

      // 1. Check if user exists FIRST
      if (!user) {
        return jsonError("User not found", 404);
      }

      // 2. Remove password hash before sending response
      const { passwordHash, ...userWithoutPassword } = user;
      return json(userWithoutPassword);
    }

    const users = await prisma.user.findMany();
    // 3. Remove password hash from ALL users in the list
    const usersWithoutPasswords = users.map((user) => {
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return json(usersWithoutPasswords);
  } catch (error) {
    console.error(error);
    return jsonError("Server error", 500);
  }
}

// POST: create new user
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return jsonError("Username and password required", 400);
    }

    // check if username exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return jsonError("This username is taken.", 409);
    }

    // hash pw
    const passwordHash = await bcrypt.hash(password, 10); // 10 as salt round - complexity

    // create new user
    const newUser = await prisma.user.create({
      data: { username, passwordHash },
    });

    // remove pw hash from user obj before sending it back - for security
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/auth/register error:", error);
    // Return the error message and a 500 status
    return NextResponse.json(
      { error: error.message || "Unknown server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PATCH: update user by id
export async function PATCH(request: NextRequest) {
  try {
    const idParam = request.nextUrl.searchParams.get("id");
    if (!idParam) {
      return jsonError("Missing id", 400);
    }
    const id = parseInt(idParam, 10);

    const { username, password } = await request.json();

    // obj to hold only fields we want to update
    const dataToUpdate: { username?: string; passwordHash?: string } = {};

    // update username
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: username,
          id: { not: id }, // exclude current user from check
        },
      });
      if (existingUser) {
        return jsonError("This username is already taken.", 409);
      }
      dataToUpdate.username = username;
    }

    // update password
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      dataToUpdate.passwordHash = passwordHash;
    }

    // nothing to update
    if (Object.keys(dataToUpdate).length === 0) {
      return jsonError("No fields to update", 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    // remove pw hash
    const { passwordHash: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return jsonError("Invalid request", 400);
  }
}

// DELETE: delete user by id
export async function DELETE(request: NextRequest) {
  try {
    const idParam = request.nextUrl.searchParams.get("id");
    if (!idParam) {
      return jsonError("Missing id", 400);
    }
    const id = parseInt(idParam, 10);
    await prisma.user.delete({ where: { id } });
    return json({ success: true }, { status: 204 });
  } catch (error) {
    console.error(error);
    return jsonError("Invalid request", 400);
  }
}
