"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useMediciones } from "@/components/ComponentsMediciones25/hooks/UseMediciones";
import { useRouter, useSearchParams } from "next/navigation";
import ResumenMedicion from "@/components/ComponentsMediciones25/resumenMedicion";
import FormularioMediciones from "@/components/ComponentsMediciones25/FormularioMediciones";
import MedicionesGeneral from "@/components/ComponentsMediciones25/medicionesGeneral";
import ActionButtons from "@/components/ComponentsMediciones25/ActionButtons";

function MedicionesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paramArea, setParamArea] = useState<string | null>(null);
  const [paramPuesto, setParamPuesto] = useState<string | null>(null);
  const [paramPunto, setParamPunto] = useState<string | null>(null);

  useEffect(() => {
    setParamArea(searchParams.get("area"));
    setParamPuesto(searchParams.get("puesto"));
    setParamPunto(searchParams.get("punto"));
  }, [searchParams]);

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
    setGlobalPointCounter,
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

  useEffect(() => {
    if (!paramArea || !paramPuesto || !paramPunto) return;

    const areaEncontrada = areas.find((a) => a.idArea.toString() === paramArea);
    if (!areaEncontrada) return;

    const puestoEncontrado = areaEncontrada.puestosData[Number(paramPuesto)];
    if (!puestoEncontrado) return;

    const puntoEncontrado = puestoEncontrado.puntos.find(
      (punto) => punto.numeroPunto === Number(paramPunto)
    );
    if (!puntoEncontrado) return;

    setSelectedArea(paramArea);
    setSelectedPuesto(puestoEncontrado.nombrePuesto);
    setGlobalPointCounter(puntoEncontrado.numeroPunto);
    setIdentificacion(puntoEncontrado.identificacion);
    setDepartamento(puntoEncontrado.departamento);
    setPlanoTrabajo(puntoEncontrado.planoTrabajo);
    setNivelIluminacion(puntoEncontrado.nivelIluminacion);
    setTipoIluminacion(puntoEncontrado.tipoIluminacion);
    setMedicionesData(puntoEncontrado.mediciones);
    setShowResumen(false);
  }, [
    paramArea,
    paramPuesto,
    paramPunto,
    areas,
    setSelectedArea,
    setSelectedPuesto,
    setGlobalPointCounter,
    setIdentificacion,
    setDepartamento,
    setPlanoTrabajo,
    setNivelIluminacion,
    setTipoIluminacion,
    setMedicionesData,
    setShowResumen,
  ]);

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
            Mediciones - Área: {selectedArea || "Sin Seleccionar"} - {areaIluminada || "Desconocida"} - Punto:{" "}
            {globalPointCounter}
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
              puntoIndex={globalPointCounter}
            />
          )}

          <ActionButtons
            onGuardar={handleGuardar}
            onAgregarPunto={handleAgregarPunto}
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

// ✅ Envolvemos en Suspense para evitar problemas de SSR
export default function MedicionesPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MedicionesContent />
    </Suspense>
  );
}
