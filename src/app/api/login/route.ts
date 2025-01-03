import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "1234") {
    return NextResponse.json({ success: true, token: "fake-jwt-token" });
  }

  return NextResponse.json({ success: false, message: "Credenciales inválidas" }, { status: 401 });
}
