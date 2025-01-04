"use client";

import React, { useState } from "react";
import Link from "next/link";
import { saveGeneralInfo } from "@/lib/saveGeneralInfo";

const InformacionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    idInforme: "",
    empresa: "",
    rfc: "",
    giro: "",
    representante: "",
    telefono: "",
    cargo: "",
    fechaMuestreo: "",
    fechaReconocimiento: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Controlar el estado del botón

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setMessage(null);

    // Validar los campos básicos
    const {
      idInforme,
      empresa,
      rfc,
      giro,
      representante,
      telefono,
      cargo,
      fechaMuestreo,
      fechaReconocimiento,
    } = formData;

    if (
      !idInforme ||
      !empresa ||
      !rfc ||
      !giro ||
      !representante ||
      !telefono ||
      !cargo ||
      !fechaMuestreo ||
      !fechaReconocimiento
    ) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true); // Cambiar el estado del botón a "Enviando"

    try {
      // Guardar datos en Firestore
      const docId = await saveGeneralInfo({
        idInforme,
        empresa,
        rfc,
        giro,
        representante,
        telefono,
        cargo,
        fechaMuestreo: new Date(fechaMuestreo),
        fechaReconocimiento: new Date(fechaReconocimiento),
      });
      setMessage(`Información guardada con éxito. ID: ${docId}`);
    } catch (error) {
      setMessage("Error al guardar la información. Intenta nuevamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false); // Restaurar el estado del botón
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Información General
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              ID Informe
            </label>
            <input
              type="text"
              name="idInforme"
              value={formData.idInforme}
              onChange={handleChange}
              tabIndex={1}
              placeholder="Ingrese el ID del informe"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              RFC
            </label>
            <input
              type="text"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              tabIndex={3}
              placeholder="RFC de la empresa"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Giro de la empresa
            </label>
            <input
              type="text"
              name="giro"
              value={formData.giro}
              onChange={handleChange}
              tabIndex={5}
              placeholder="Ingrese el giro de la empresa"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Representante Legal
            </label>
            <input
              type="text"
              name="representante"
              value={formData.representante}
              onChange={handleChange}
              tabIndex={7}
              placeholder="Nombre del representante legal"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Fecha de Muestreo inicial
            </label>
            <input
              type="date"
              name="fechaMuestreo"
              value={formData.fechaMuestreo}
              onChange={handleChange}
              tabIndex={9}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
          </div>
          {/* Columna derecha */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Empresa
            </label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              tabIndex={2}
              placeholder="Nombre de la empresa"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              tabIndex={4}
              placeholder="Teléfono de contacto"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Informe dirigido a (Cargo 1)
            </label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              tabIndex={6}
              placeholder="Cargo al que va dirigido"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Fecha de reconocimiento
            </label>
            <input
              type="date"
              name="fechaReconocimiento"
              value={formData.fechaReconocimiento}
              onChange={handleChange}
              tabIndex={8}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            />
          </div>
        </div>
        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting} // Deshabilitar mientras se envían datos
            className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition transform hover:scale-105 ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Guardando..." : "Guardar Información"}
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
