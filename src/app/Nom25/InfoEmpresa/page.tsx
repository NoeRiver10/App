import React from "react";
import Link from "next/link";

const InformacionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Información General</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ID Informe</label>
            <input
              type="text"
              tabIndex={1}
              placeholder="Ingrese el ID del informe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">RFC</label>
            <input
              type="text"
              tabIndex={3}
              placeholder="RFC de la empresa"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">Giro de la empresa</label>
            <input
              type="text"
              tabIndex={5}
              placeholder="Ingrese el giro de la empresa"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">Representante Legal</label>
            <input
              type="text"
              tabIndex={7}
              placeholder="Nombre del representante legal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">Fecha de Muestreo inicial</label>
            <input
              type="date"
              tabIndex={9}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
          </div>
          {/* Columna derecha */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Empresa</label>
            <input
              type="text"
              tabIndex={2}
              placeholder="Nombre de la empresa"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">Teléfono</label>
            <input
              type="text"
              tabIndex={4}
              placeholder="Teléfono de contacto"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">Informe dirigido a (Cargo 1)</label>
            <input
              type="text"
              tabIndex={6}
              placeholder="Cargo al que va dirigido"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">Fecha de reconocimiento</label>
            <input
              type="date"
              tabIndex={8}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition transform hover:scale-105">
            Guardar Información
          </button>
          <Link
            href="/Nom25/Reconocimiento"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg transition transform hover:scale-105"
          >
            Ir a Reconocimiento
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InformacionPage;
