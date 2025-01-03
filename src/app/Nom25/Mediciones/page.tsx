"use client";
import { Area, Punto } from '@/app/context/context25/areascontext';
import React, { useState, useEffect, useMemo } from "react";
import { useAreas } from  '@/app/context/context25/areascontext'
import { useRouter } from "next/navigation";
import MedicionesGeneral from '@/components/ComponentsMediciones25/medicionesGeneral';
import ResumenMedicion from '@/components/ComponentsMediciones25/resumenMedicion';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NIVELES_ILUMINACION = [20, 50, 100, 200, 300, 500, 750, 1000, 2000];

// Función reutilizable para inicializar datos de medición
const createMedicionesData = (tipo: string) =>
  Array.from({ length: tipo === "ARTIFICIAL" ? 1 : 4 }, () => ({
    hora: "",
    trabajoE1: "",
    trabajoE2: "",
    paredesE1: "N/A",
    paredesE2: "N/A",
  }));

export default function MedicionesPage() {
  const { areas, setAreas } = useAreas();
  const router = useRouter();

  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedPuesto, setSelectedPuesto] = useState<string>("");
  const [identificacion, setIdentificacion] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [planoTrabajo, setPlanoTrabajo] = useState<string>("");
  const [nivelIluminacion, setNivelIluminacion] = useState<number | "">("");
  const [tipoIluminacion, setTipoIluminacion] = useState<string>("");
  const [globalPointCounter, setGlobalPointCounter] = useState<number>(1);
  const [showResumen, setShowResumen] = useState<boolean>(false);
  const [medicionesData, setMedicionesData] = useState(
    createMedicionesData("")
  );

  // Calcular puestos de trabajo dinámicamente
  const puestosTrabajo = useMemo(() => {
    const area = areas.find((area) => area.idArea.toString() === selectedArea);
    return area?.puestosData.map((puesto) => puesto.nombrePuesto) || [];
  }, [selectedArea, areas]);

  // Inicializar contador de puntos
  useEffect(() => {
    try {
      const savedAreas: Area[] = JSON.parse(localStorage.getItem("areas") || "[]");
      const lastPoint = savedAreas
        .flatMap((area) => area.puestosData)
        .flatMap((puesto) => puesto.puntos)
        .pop();
  
      setGlobalPointCounter(lastPoint ? lastPoint.numeroPunto + 1 : 1);
    } catch (error) {
      console.error("Error al cargar datos desde localStorage:", error);
      setGlobalPointCounter(1);
    }
  }, []);
  
  // Actualizar datos de medición según tipo de iluminación
  useEffect(() => {
    setMedicionesData(createMedicionesData(tipoIluminacion));
  }, [tipoIluminacion]);

  // Función para guardar datos
  const handleGuardar = () => {
    const updatedAreas = areas.map((area) => {
      if (area.idArea.toString() === selectedArea) {
        const updatedPuestos = area.puestosData.map((puesto) => {
          if (puesto.nombrePuesto === selectedPuesto) {
            return {
              ...puesto,
              puntos: [
                ...puesto.puntos,
                {
                  numeroPunto: globalPointCounter,
                  identificacion,
                  departamento,
                  planoTrabajo,
                  nivelIluminacion,
                  tipoIluminacion,
                  mediciones: medicionesData,
                },
              ],
            };
          }
          return puesto;
        });
        return { ...area, puestosData: updatedPuestos };
      }
      return area;
    });

    setAreas(updatedAreas);
    localStorage.setItem("areas", JSON.stringify(updatedAreas));
    alert("Datos guardados con éxito");
  };

  // Función para agregar un nuevo punto
  const handleAgregarPunto = () => {
    setGlobalPointCounter((prev) => prev + 1);
    resetInputs();
  };

  // Función para avanzar al siguiente departamento
  const handleSiguienteDepartamento = () => {
    setGlobalPointCounter((prev) => prev + 1);
    setDepartamento("");
    resetInputs();
  };

  // Función para resetear inputs
  const resetInputs = () => {
    setIdentificacion("");
    setPlanoTrabajo("");
    setNivelIluminacion("");
    setTipoIluminacion("");
    setMedicionesData(createMedicionesData(""));
  };

  // Función para borrar todos los datos
  const borrarDatos = () => {
    localStorage.removeItem("areas");
    setAreas([]);
    setGlobalPointCounter(1);
    alert("Datos eliminados con éxito");
  };
  const navigateToPoint = (direction: "next" | "previous") => {
    // Obtener todos los puntos ordenados por número
    const allPoints = areas
      .flatMap((area) => area.puestosData)
      .flatMap((puesto) => puesto.puntos)
      .sort((a, b) => a.numeroPunto - b.numeroPunto);
  
    if (allPoints.length === 0) {
      alert("No hay puntos registrados.");
      return;
    }
  
    // Buscar el índice del punto actual
    const currentIndex = allPoints.findIndex(
      (punto) => punto.numeroPunto === globalPointCounter
    );
  
    if (currentIndex === -1) {
      alert("Punto actual no encontrado.");
      return;
    }
  
    // Mover al siguiente o anterior punto
    let newIndex = currentIndex;
    if (direction === "next") {
      newIndex = Math.min(currentIndex + 1, allPoints.length - 1);
    } else if (direction === "previous") {
      newIndex = Math.max(currentIndex - 1, 0);
    }
  
    // Actualizar los datos del punto seleccionado
    updatePointData(allPoints[newIndex]);
  };
  
  // Función para actualizar los datos del punto seleccionado
  const updatePointData = (point: Punto) => {
    setGlobalPointCounter(point.numeroPunto);
    setIdentificacion(point.identificacion);
    setDepartamento(point.departamento);
    setPlanoTrabajo(point.planoTrabajo);
    setNivelIluminacion(point.nivelIluminacion);
    setTipoIluminacion(point.tipoIluminacion);
    setMedicionesData(point.mediciones || createMedicionesData(""));
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      {showResumen ? (
        <>
          <ResumenMedicion />
          <button
            onClick={() => setShowResumen(false)}
            className="bg-blue-600 text-white p-3 rounded-md mt-4"
          >
            Volver a Mediciones
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
            Mediciones - Área: {selectedArea || "Sin Seleccionar"} - Departamento:{" "}
            {departamento || "Sin Seleccionar"} - Punto: {globalPointCounter}
          </h1>
          <div className="flex flex-col space-y-4 mb-8">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione un Área
              </option>
              {areas.map((area) => (
                <option key={area.idArea} value={area.idArea}>
                  Área {area.idArea} - {area.identificacionData.areaIluminada || area.nombreArea}
                </option>
              ))}
            </select>
            <select
              value={selectedPuesto}
              onChange={(e) => setSelectedPuesto(e.target.value)}
              disabled={!selectedArea}
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione un Puesto
              </option>
              {puestosTrabajo.map((puesto, index) => (
                <option key={index} value={puesto}>
                  {puesto}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              placeholder="Departamento"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              placeholder="Identificación"
              className="p-3 border border-gray-300 rounded-md"
            />
            <select
              value={planoTrabajo}
              onChange={(e) => setPlanoTrabajo(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione Plano de Trabajo
              </option>
              <option value="HORIZONTAL">Horizontal</option>
              <option value="VERTICAL">Vertical</option>
              <option value="OBLICUO">Oblicuo</option>
            </select>
            <select
              value={nivelIluminacion}
              onChange={(e) =>
                setNivelIluminacion(Number(e.target.value) || "")
              }
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione Nivel de Iluminación
              </option>
              {NIVELES_ILUMINACION.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel} lux
                </option>
              ))}
            </select>
            <select
              value={tipoIluminacion}
              onChange={(e) => setTipoIluminacion(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione Tipo de Iluminación
              </option>
              <option value="NATURAL">Natural</option>
              <option value="ARTIFICIAL">Artificial</option>
              <option value="COMBINADA">Combinada</option>
            </select>
          </div>

          {tipoIluminacion && (
            <MedicionesGeneral
              tipoMedicion={tipoIluminacion}
              numMediciones={tipoIluminacion === "ARTIFICIAL" ? 1 : 4}
              areaId={Number(selectedArea)}
              puestoIndex={puestosTrabajo.indexOf(selectedPuesto)}
              medicionesData={medicionesData}
              setMedicionesData={setMedicionesData}
            />
          )}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-4">
          <button
            onClick={() => navigateToPoint("previous")}
            disabled={globalPointCounter <= 1}
            className={`flex items-center justify-center ${
              globalPointCounter <= 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800"
            } text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 text-sm`}
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <button
            onClick={() => navigateToPoint("next")}
            disabled={
              areas.flatMap((area) => area.puestosData).flatMap((puesto) => puesto.puntos)
                .length === globalPointCounter
            }
            className={`flex items-center justify-center ${
              areas.flatMap((area) => area.puestosData).flatMap((puesto) => puesto.puntos)
                .length === globalPointCounter
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800"
            } text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 text-sm`}
          >
            <FaArrowRight className="text-xl" />
          </button>
          
          <button
            onClick={handleGuardar}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transition transform hover:scale-105 text-sm"
          >
            Guardar
          </button>
          <button
            onClick={handleAgregarPunto}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 hover:shadow-lg transition transform hover:scale-105 text-sm"
          >
            Agregar Punto
          </button>
          <button
            onClick={handleSiguienteDepartamento}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-800 hover:shadow-lg transition transform hover:scale-105 text-sm"
          >
            Siguiente Departamento
          </button>
          <button
            onClick={() => setShowResumen(true)}
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-800 hover:shadow-lg transition transform hover:scale-105 text-sm"
          >
            Ir a Resumen
          </button>
          <button
            onClick={() => router.push("/Nom25/Reconocimiento")}
            className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-orange-600 hover:to-orange-800 hover:shadow-lg transition transform hover:scale-105 text-sm"
          >
            Ir a Reconocimiento
          </button>
          <button
            onClick={borrarDatos}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 hover:shadow-lg transition transform hover:scale-105 text-sm"
          >
            Borrar Datos
          </button>
        </div>
        </>
      )}
    </div>
  );
}

