import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 303 so the browser turns the form POST into a GET on /login.
  const response = NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  response.cookies.delete("bandgate_session");
  return response;
}
