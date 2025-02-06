"use client";
import React from "react";
import { useMediciones } from "@/components/ComponentsMediciones25/hooks/UseMediciones";
import { useRouter } from "next/navigation";
import ResumenMedicion from "@/components/ComponentsMediciones25/resumenMedicion";
import FormularioMediciones from "@/components/ComponentsMediciones25/FormularioMediciones";
import MedicionesGeneral from "@/components/ComponentsMediciones25/medicionesGeneral";
import ActionButtons from "@/components/ComponentsMediciones25/ActionButtons";

export default function MedicionesPage() {
  const router = useRouter();

  const {
    areas,
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
    globalPointCounter,
    showResumen,
    setShowResumen,
    medicionesData,
    setMedicionesData,
    areaIluminada,
    puestosTrabajo,
    handleGuardar,
    handleAgregarPunto,
    navigateToPoint, 
  } = useMediciones();

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
          <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
            Mediciones - Área: {selectedArea || "Sin Seleccionar"} - {areaIluminada || "Desconocida"} - Punto: {globalPointCounter}
          </h1>

          <FormularioMediciones
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedPuesto={selectedPuesto}
            setSelectedPuesto={setSelectedPuesto}
            identificacion={identificacion}
            setIdentificacion={setIdentificacion}
            departamento={departamento}
            setDepartamento={setDepartamento}
            planoTrabajo={planoTrabajo}
            setPlanoTrabajo={setPlanoTrabajo}
            nivelIluminacion={nivelIluminacion}
            setNivelIluminacion={setNivelIluminacion}
            tipoIluminacion={tipoIluminacion}
            setTipoIluminacion={setTipoIluminacion}
            areas={areas}
            puestosTrabajo={puestosTrabajo}
          />

          {tipoIluminacion && (
            <MedicionesGeneral
              tipoMedicion={tipoIluminacion}
              numMediciones={tipoIluminacion === "ARTIFICIAL" ? 1 : 4}
              medicionesData={medicionesData}
              setMedicionesData={setMedicionesData}
              areaId={selectedArea ? Number(selectedArea) : 0}
              puestoIndex={puestosTrabajo.indexOf(selectedPuesto)}
              puntoIndex={globalPointCounter} // 🔹 Se pasa correctamente
            />
          )}

        <ActionButtons
          onGuardar={handleGuardar}
          onAgregarPunto={handleAgregarPunto} // ✅ Ahora sí la función correcta
          onBorrarDatos={() => {
            localStorage.removeItem("areas");
            alert("Datos eliminados con éxito");
          }}
          navigateToPoint={navigateToPoint}
          canNavigateNext={true}
          canNavigatePrevious={globalPointCounter > 1}
          onIrReconocimiento={() => router.push("/Nom25/Reconocimiento")}
          onShowResumen={() => setShowResumen(true)}
        />

        </>
      )}
    </div>
  );
}
