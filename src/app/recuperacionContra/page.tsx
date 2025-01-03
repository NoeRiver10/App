"use client";

import Link from "next/link";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Image from "next/image";

export default function RecuperacionContraPage() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.includes("@")) {
      setError("Por favor, introduce un correo válido.");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar el correo de restablecimiento de contraseña
      await sendPasswordResetEmail(auth, email);
      setMessage("Correo de restablecimiento enviado. Revisa tu bandeja de entrada.");
    } catch (err: unknown) {
      console.error("Error al enviar el correo de restablecimiento:", err);

      let errorMessage = "Ocurrió un problema inesperado. Revisa la consola para más detalles.";

      if (typeof err === "object" && err !== null && "code" in err) {
        const firebaseError = err as { code: string };
        switch (firebaseError.code) {
          case "auth/user-not-found":
            errorMessage = "No se encontró un usuario con ese correo electrónico.";
            break;
          case "auth/invalid-email":
            errorMessage = "El correo ingresado no tiene un formato válido.";
            break;
          default:
            errorMessage = "Error desconocido. Por favor, inténtalo de nuevo.";
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        {/* Logo y encabezado central */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/lictus-logo-1.png"
            alt="Lictus Logo Central"
            width={120}
            height={120}
            className="mb-4"
            style={{ width: "auto", height: "auto" }} // Ajustar el tamaño manteniendo la relación de aspecto
          />
          <h1 className="text-2xl font-bold text-gray-800">
            LICTUS S.A. DE C.V.
          </h1>
          <p className="text-gray-600 text-center">
            Soluciones en Seguridad y Salud en el Trabajo
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Mensaje de éxito */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {message}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="tucorreo@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Correo de Restablecimiento"}
          </button>
        </form>

        {/* Enlace para volver al inicio de sesión */}
        <div className="text-center mt-4">
        <p>
          ¿Recordaste tu contraseña?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
