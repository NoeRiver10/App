"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla si la barra está abierta o cerrada
  const [isServiciosOpen, setIsServiciosOpen] = useState(false); // Controla si el submenú de Servicios está abierto
  const [userName, setUserName] = useState<string | null>(""); // Estado para el nombre del usuario
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true); // Estado para cargar el usuario

  useEffect(() => {
    // Obtener el nombre del usuario autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, asignamos su nombre
        setUserName(user.displayName || "Usuario");
      } else {
        // Si no hay un usuario autenticado
        setUserName(null);
      }
      setIsLoadingUser(false); // Finaliza la carga del usuario
    });

    return () => unsubscribe(); // Limpia el listener cuando se desmonte el componente
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleServicios = () => {
    setIsServiciosOpen(!isServiciosOpen); // Alterna el estado del submenú de Servicios
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      {/* Barra Lateral */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transform lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:relative top-0 left-0 w-64 lg:w-1/5 bg-blue-600 text-white p-6 h-full shadow-lg z-20`}
        role="navigation"
        aria-label="Barra lateral de navegación"
      >
        <button
          onClick={toggleSidebar}
          className="p-4 bg-blue-500 hover:bg-blue-700 text-white focus:outline-none lg:hidden mb-4"
          aria-label={isSidebarOpen ? "Ocultar menú" : "Mostrar menú"}
        >
          Cerrar
        </button>
        <nav className="space-y-4 mt-6">
          <h2 className="text-xl font-bold mb-4">Menú</h2>
          <ul className="space-y-2">
            {/* Servicios con submenú */}
            <li>
              <button
                onClick={toggleServicios}
                className="flex items-center justify-between w-full text-lg focus:outline-none"
                aria-expanded={isServiciosOpen}
              >
                Servicios
                <span>{isServiciosOpen ? "▲" : "▼"}</span>
              </button>
              {isServiciosOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <Link
                    href="/Nom25/InfoEmpresa"
                      className="hover:underline text-lg"
                    >
                      NOM-025
                    </Link>
                  </li>
                  {/* Puedes agregar más opciones aquí */}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div
        className={`flex-grow lg:ml-64 transition-all duration-300 p-6 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Encabezado */}
        <header className="bg-white shadow p-4 rounded-lg mb-8 flex items-center justify-between flex-wrap lg:flex-nowrap">
          <div className="flex items-center w-full lg:w-auto mb-4 lg:mb-0">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-blue-600 rounded-full text-white lg:hidden mr-4"
              aria-label="Mostrar menú"
            >
              <FaBars size={24} />
            </button>
            <div className="flex items-center">
              <Image
                src="/icons/lictus-logo-1-192x192.png"
                alt="Logo Lictus"
                width={50}
                height={50}
                className="mr-4"
              />
              <div className="text-left">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                  Lictus SA de CV
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Soluciones en Seguridad y Salud en el Trabajo
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full lg:w-auto justify-center lg:justify-end">
            <FaUserCircle className="text-4xl text-gray-800 mr-2" />
            <p className="text-lg text-gray-800">
              Bienvenido, {userName || "Usuario"}
            </p>
          </div>
        </header>

        {/* Información General */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Bienvenido al Sistema de Levantamiento de Normas Oficiales de Lictus
          </h2>
          <p className="text-lg text-gray-700">
            En esta plataforma podrás registrar la información de las normas
            oficiales aplicables.
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center p-4 bg-gray-100 w-full mt-auto">
          <p className="text-sm">
            &copy; 2024 Lictus SA de CV. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
