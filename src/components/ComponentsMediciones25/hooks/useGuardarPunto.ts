import { useGetAreas } from "./useAreas";
import { Dispatch, SetStateAction } from "react";
import { MedicionesData, Area } from "@/app/types/areasTypes";

interface UseGuardarPuntoProps {
  selectedArea: string;
  selectedPuesto: string;
  identificacion: string;
  departamento: string;
  planoTrabajo: string;
  nivelIluminacion: number | "";
  tipoIluminacion: string;
  medicionesData: MedicionesData[];
  globalPointCounter: number;
  setGlobalPointCounter: Dispatch<SetStateAction<number>>; // ✅ Agregado aquí
  setAreas: Dispatch<SetStateAction<Area[]>>; // ✅ También debe estar aquí
}

// 📌 Hook para manejar el guardado y edición de puntos
export function useGuardarPunto({
  selectedArea,
  selectedPuesto,
  identificacion,
  departamento,
  planoTrabajo,
  nivelIluminacion,
  tipoIluminacion,
  medicionesData,
  globalPointCounter,
  setAreas,
}: UseGuardarPuntoProps) {
  const { areas } = useGetAreas();

  const handleGuardar = () => {
    if (!selectedArea || !selectedPuesto) {
      alert("Debe seleccionar un área y un puesto antes de guardar.");
      return;
    }

    const newPoint = {
      numeroPunto: globalPointCounter,
      identificacion,
      departamento,
      planoTrabajo,
      nivelIluminacion,
      tipoIluminacion,
      mediciones: medicionesData,
    };

    console.log("📌 Guardando/actualizando punto:", newPoint);

    const updatedAreas = areas.map((area) => {
      if (area.idArea.toString() === selectedArea) {
        return {
          ...area,
          puestosData: area.puestosData.map((puesto) => {
            if (puesto.nombrePuesto === selectedPuesto) {
              const existingPointIndex = puesto.puntos.findIndex(
                (punto) => punto.numeroPunto === globalPointCounter
              );
              if (existingPointIndex !== -1) {
                // ✏️ Editar punto existente
                const updatedPuntos = [...puesto.puntos];
                updatedPuntos[existingPointIndex] = newPoint;
                return { ...puesto, puntos: updatedPuntos };
              } else {
                // ✅ Agregar nuevo punto
                return { ...puesto, puntos: [...puesto.puntos, newPoint] };
              }
            }
            return puesto;
          }),
        };
      }
      return area;
    });

    setAreas(updatedAreas);
    localStorage.setItem("areas", JSON.stringify(updatedAreas));
    alert("Datos guardados con éxito");
  };

  return { handleGuardar };
}
