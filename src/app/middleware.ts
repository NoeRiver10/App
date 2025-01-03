import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Obtener el token de las cookies
  const token = req.cookies.get("authToken");

  // Rutas protegidas
  const protectedRoutes = ["/dashboard"];

  // Verificar si el usuario no está autenticado
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!token) {
      url.pathname = "/"; // Redirigir al inicio de sesión si no hay token
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
