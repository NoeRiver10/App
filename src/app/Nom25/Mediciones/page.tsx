"use client";
import { Area, Punto } from '@/app/context/context25/areascontext';
import React, { useState, useEffect, useMemo } from "react";
import { useAreas } from '@/app/context/context25/areascontext';
import { useRouter } from "next/navigation";
import MedicionesGeneral from '@/components/ComponentsMediciones25/medicionesGeneral';
import ResumenMedicion from '@/components/ComponentsMediciones25/resumenMedicion';
import FormularioSeleccion from '@/components/ComponentsMediciones25/FormularioSeleccion';
import ActionButtons from '@/components/ComponentsMediciones25/ActionButtons';

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
  const [medicionesData, setMedicionesData] = useState(createMedicionesData(""));

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
    // Validar que se haya seleccionado un área y un puesto
    if (!selectedArea || !selectedPuesto) {
      alert("Por favor, seleccione un área y un puesto antes de guardar.");
      return;
    }
  
    // Validar que existan mediciones
    if (!medicionesData || medicionesData.length === 0) {
      alert("No hay datos de mediciones para guardar.");
      console.error("MedicionesData vacío o no definido:", medicionesData);
      return;
    }
  
    // Crear el nuevo punto con la información actual
    const nuevoPunto = {
      numeroPunto: globalPointCounter,
      identificacion,
      departamento,
      planoTrabajo,
      nivelIluminacion,
      tipoIluminacion,
      mediciones: medicionesData, // Agregamos las mediciones aquí
    };
  
    console.log("=== Iniciando guardado ===");
    console.log("Área seleccionada (idArea):", selectedArea);
    console.log("Puesto seleccionado (nombrePuesto):", selectedPuesto);
    console.log("Nuevo punto a guardar:", nuevoPunto);
  
    // Verificar si el área existe en el estado
    const areaSeleccionada = areas.find(
      (area) => area.idArea.toString() === selectedArea
    );
  
    if (!areaSeleccionada) {
      alert("El área seleccionada no existe.");
      console.error("Área no encontrada:", selectedArea);
      return;
    }
  
    console.log("Área encontrada:", areaSeleccionada);
  
    // Normalizar nombres para comparación
    const normalizedPuesto = selectedPuesto.trim().toLowerCase();
  
    // Verificar si el puesto existe en el área seleccionada
    const puestoSeleccionado = areaSeleccionada.puestosData.find(
      (puesto) => puesto.nombrePuesto.trim().toLowerCase() === normalizedPuesto
    );
  
    console.log("Puestos disponibles en el área:", areaSeleccionada.puestosData);
  
    if (!puestoSeleccionado) {
      alert("El puesto seleccionado no existe en el área.");
      console.error(
        `Puesto "${selectedPuesto}" no encontrado en el área:`,
        areaSeleccionada
      );
      return;
    }
  
    console.log("Puesto encontrado:", puestoSeleccionado);
  
    // Actualizar el puesto con el nuevo punto
    const updatedPuestos = areaSeleccionada.puestosData.map((puesto) => {
      if (puesto.nombrePuesto.trim().toLowerCase() === normalizedPuesto) {
        console.log(`Agregando punto al puesto: ${puesto.nombrePuesto}`);
        return {
          ...puesto,
          puntos: [...puesto.puntos, nuevoPunto], // Agregar el nuevo punto con las mediciones
        };
      }
      return puesto; // Mantener los demás puestos sin cambios
    });
  
    console.log("Puestos actualizados:", updatedPuestos);
  
    // Actualizar el área seleccionada con los nuevos datos de puestos
    const updatedAreas = areas.map((area) => {
      if (area.idArea.toString() === selectedArea) {
        return {
          ...area,
          puestosData: updatedPuestos,
        };
      }
      return area; // Mantener las demás áreas sin cambios
    });
  
    console.log("Áreas actualizadas:", updatedAreas);
  
    // Actualizar el estado y guardar en localStorage
    setAreas(updatedAreas);
    localStorage.setItem("areas", JSON.stringify(updatedAreas));
  
    console.log("Datos guardados en localStorage:", JSON.parse(localStorage.getItem("areas") || "[]"));
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
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
          >
            Volver a Mediciones
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
            Mediciones - Área: {selectedArea || "Sin Seleccionar"} - Departamento: {" "}
            {departamento || "Sin Seleccionar"} - Punto: {globalPointCounter}
          </h1>
          
            <FormularioSeleccion
              formData={{
                selectedArea,
                selectedPuesto,
              }}
              updateField={(field: "selectedArea" | "selectedPuesto", value: string) => {
                if (field === "selectedArea") setSelectedArea(value);
                if (field === "selectedPuesto") setSelectedPuesto(value);
              }}
              areas={areas}
              puestosTrabajo={puestosTrabajo}
            />
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
          <ActionButtons
            onGuardar={handleGuardar}
            onAgregarPunto={handleAgregarPunto}
            onSiguienteDepartamento={handleSiguienteDepartamento}
            onBorrarDatos={borrarDatos}
            navigateToPoint={navigateToPoint}
            canNavigateNext={
              areas.flatMap((area) => area.puestosData).flatMap((puesto) => puesto.puntos).length >
              globalPointCounter
            }
            canNavigatePrevious={globalPointCounter > 1}
            onIrReconocimiento={() => router.push("/Nom25/Reconocimiento")}
            onShowResumen={() => setShowResumen(true)}
          />
        </>
      )}
    </div>
  );
}