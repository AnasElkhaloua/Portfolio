import { NextRequest, NextResponse } from "next/server";
import { getProtectedProjectByPath } from "@/utils/projects";
import {
  createRouteAccessToken,
  passwordsMatch,
  ROUTE_ACCESS_COOKIE,
  ROUTE_ACCESS_MAX_AGE,
} from "@/utils/routeAccess";

const MAX_REQUEST_BYTES = 2_048;

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ message: "Request is too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ message: "Request is too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const { password, path } = body as Record<string, unknown>;
  if (
    typeof password !== "string" ||
    typeof path !== "string" ||
    !getProtectedProjectByPath(path)
  ) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

  if (!correctPassword) {
    console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  if (passwordsMatch(password, correctPassword)) {
    const token = createRouteAccessToken(path);
    if (!token) {
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set(ROUTE_ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ROUTE_ACCESS_MAX_AGE,
      sameSite: "strict",
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
}
