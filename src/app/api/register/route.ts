import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Aquí puedes procesar la solicitud
    const body = await request.json();

    // Ejemplo de respuesta
    return NextResponse.json({
      success: true,
      message: "Solicitud procesada exitosamente",
      data: body,
    });
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error en el servidor",
      },
      { status: 500 }
    );
  }
}
