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

// GET: get user(s) by id
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      // remove passwordHash from the response - avoid exposure
      const { passwordHash: _, userWithoutPassword } = user;

      if (!user) {
        return new NextResponse("User not found", {
          status: 404,
          headers: corsHeaders,
        });
      }
      return NextResponse.json(user, { headers: corsHeaders });
    }

    const users = await prisma.user.findMany();
    return NextResponse.json(users, { headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// POST: create new user
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new NextResponse("Username and password required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // check if username exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return new NextResponse("This username is taken.", {
        status: 409,
        headers: corsHeaders,
      });
    }

    // hash pw
    const passwordHash = await bcrypt.hash(password, 10); // 10 as salt round - complexity

    // create new user
    const newUser = await prisma.user.create({
      data: { username, passwordHash },
    });

    // remove pw hash from user obj before sending it back - for security
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Invalid request body", {
      status: 400,
      headers: corsHeaders,
    });
  }
}

// PATCH: update user by id
export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return new NextResponse("Missing id", {
        status: 400,
        headers: corsHeaders,
      });
    }

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
        return new NextResponse("This username is already taken.", {
          status: 409,
          headers: corsHeaders,
        });
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
      return new NextResponse("No fields to update", {
        status: 400,
        headers: corsHeaders,
      });
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
    return new NextResponse("Invalid request", {
      status: 400,
      headers: corsHeaders,
    });
  }
}

// DELETE: delete user by id
export async function Delete(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return new NextResponse("Missing id", {
        status: 400,
        headers: corsHeaders,
      });
    }
    await prisma.user.delete({ where: { id } });
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return new NextResponse("Invalid request", {
      status: 400,
      headers: corsHeaders,
    });
  }
}
