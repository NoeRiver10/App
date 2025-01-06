"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, AuthError, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Image from "next/image";

export default function RegistroPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas del formulario
    if (!username) {
      setError("Por favor, introduce un nombre de usuario.");
      return;
    }
    if (!email.includes("@")) {
      setError("Por favor, introduce un correo válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      // Crear usuario con Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Actualizar el perfil del usuario para agregar el nombre de usuario
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      setIsLoading(false);
      // Redirigir al usuario al dashboard después del registro exitoso
      router.push("/dashboard");
    } catch (err: unknown) {
      if (isFirebaseAuthError(err)) {
        const errorMessage = getFirebaseErrorMessage(err.code);
        setError(errorMessage);
      } else {
        setError("Ocurrió un problema inesperado. Revisa la consola para más detalles.");
        console.error("Error inesperado:", err);
      }
      setIsLoading(false);
    }
  };

  // Verifica si el error es un error de Firebase Auth
  const isFirebaseAuthError = (error: unknown): error is AuthError => {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as AuthError).code === "string"
    );
  };

  // Obtiene el mensaje de error adecuado según el código de Firebase
  const getFirebaseErrorMessage = (code: string): string => {
    switch (code) {
      case "auth/email-already-in-use":
        return "El correo ya está en uso. Por favor, usa uno diferente.";
      case "auth/invalid-email":
        return "El correo ingresado no tiene un formato válido.";
      case "auth/weak-password":
        return "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
      default:
        return "Error desconocido. Por favor, inténtalo de nuevo.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        {/* Logo y encabezado central */}
        <div className="flex flex-col items-center mb-6">
          <Image
           src="/icons/lictus-logo-1.png"
            alt="Lictus Logo Central"
            width={120}
            height={120}
            className="mb-4"
            style={{ width: "auto", height: "auto" }}
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

        {/* Formulario */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-semibold mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Tu nombre de usuario"
              required
            />
          </div>
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
          <div>
            <label htmlFor="password" className="block text-lg font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Registrarse"}
          </button>
        </form>

        <div className="text-center mt-4">
        <p>
        ¿Ya tienes una cuenta?{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
        </div>
      </div>
    </div>
  );
}
