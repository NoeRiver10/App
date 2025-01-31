// app/page.tsx
"use client";
import React, { useState } from "react";
import { useAreas } from "@/app/context/context25/areascontext";
import { useRouter } from "next/navigation";
import { useMediciones } from "@/app/hook/useMediciones";
import { useNavegacion } from "@/app/hook/useNavegacion";
import { FormularioMediciones } from "@/components/ComponentsMediciones25/FormularioMediciones";
import ResumenMedicion from "@/components/ComponentsMediciones25/resumenMedicion";
import MedicionesGeneral from "@/components/ComponentsMediciones25/medicionesGeneral";
import ActionButtons from "@/components/ComponentsMediciones25/ActionButtons";

export default function MedicionesPage() {
  const { areas, setAreas } = useAreas();
  const router = useRouter();
  const [showResumen, setShowResumen] = useState<boolean>(false);

  const {
    selectedArea,
    setSelectedArea,
    selectedPuesto,
    setSelectedPuesto,
    identificacion,
    setIdentificacion,
    departamento,
    setDepartamento,
    planoTrabajo,
    setPlanoTrabajo,
    nivelIluminacion,
    setNivelIluminacion,
    tipoIluminacion,
    setTipoIluminacion,
    medicionesData,
    setMedicionesData,
    puestosTrabajo,
    resetInputs,
    NIVELES_ILUMINACION,
    updatePointData, // Función para actualizar datos del punto
  } = useMediciones(areas);

  const {
    globalPointCounter,
    setGlobalPointCounter,
    selectedPoint, // ✅ Agregar esta línea para obtener el punto actual
    navigateToPoint,
  } = useNavegacion(areas);
  
  // Función para manejar la navegación entre puntos
  const handleNavigate = (direction: "next" | "previous") => {
    const newPoint = navigateToPoint(direction);
    if (newPoint) {
      updatePointData(newPoint); // Actualizar el formulario con los datos del nuevo punto
    }
  };

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

  const handleAgregarPunto = () => {
    setGlobalPointCounter((prev) => prev + 1);
    resetInputs();
  };

  const borrarDatos = () => {
    localStorage.removeItem("areas");
    setAreas([]);
    setGlobalPointCounter(1);
    alert("Datos eliminados con éxito");
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
          <FormularioMediciones
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedPuesto={selectedPuesto}
            setSelectedPuesto={setSelectedPuesto}
            departamento={departamento}
            setDepartamento={setDepartamento}
            identificacion={identificacion}
            setIdentificacion={setIdentificacion}
            planoTrabajo={planoTrabajo}
            setPlanoTrabajo={setPlanoTrabajo}
            nivelIluminacion={nivelIluminacion}
            setNivelIluminacion={setNivelIluminacion}
            tipoIluminacion={tipoIluminacion}
            setTipoIluminacion={setTipoIluminacion}
            puestosTrabajo={puestosTrabajo}
            areas={areas}
            NIVELES_ILUMINACION={NIVELES_ILUMINACION}
            selectedPoint={selectedPoint}
          />
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
            onBorrarDatos={borrarDatos}
            navigateToPoint={handleNavigate} // Pasar la función de navegación
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