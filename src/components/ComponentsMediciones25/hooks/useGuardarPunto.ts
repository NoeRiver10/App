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
  globalPointCounter: number; // Mantiene la referencia actual
  setTotalPuntos: Dispatch<SetStateAction<number>>; // Controla la numeración global
  setAreas: Dispatch<SetStateAction<Area[]>>;
}

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
  setTotalPuntos,
  setAreas,
}: UseGuardarPuntoProps) {
  const { areas } = useGetAreas();

  const handleGuardar = () => {
    if (!selectedArea || !selectedPuesto) {
      alert("Debe seleccionar un área y un puesto antes de guardar.");
      return;
    }

    // 📌 Obtener el número de punto más alto de todas las áreas
    const maxPuntoExistente = Math.max(
      ...areas.flatMap(area => area.puestosData.flatMap(puesto => puesto.puntos.map(punto => punto.numeroPunto))),
      0
    );

    let nuevoNumeroPunto = globalPointCounter;

    const areaEncontrada = areas.find(area => area.idArea.toString() === selectedArea);
    const puestoEncontrado = areaEncontrada?.puestosData.find(puesto => puesto.nombrePuesto === selectedPuesto);
    const puntoExistente = puestoEncontrado?.puntos.find(punto => punto.numeroPunto === globalPointCounter);

    if (!puntoExistente) {
      // 📌 Si no existe, usamos el siguiente número disponible
      nuevoNumeroPunto = maxPuntoExistente + 1;
      setTotalPuntos(nuevoNumeroPunto); // ✅ Actualizar la numeración global
    } else {
      // 📌 Si ya existe, usamos su número
      nuevoNumeroPunto = puntoExistente.numeroPunto;
    }

    const newPoint = {
      numeroPunto: nuevoNumeroPunto,
      identificacion,
      departamento,
      planoTrabajo,
      nivelIluminacion,
      tipoIluminacion,
      mediciones: medicionesData,
    };

    console.log("📌 Guardando/actualizando punto:", newPoint);

    const updatedAreas = areas.map(area => {
      if (area.idArea.toString() === selectedArea) {
        return {
          ...area,
          puestosData: area.puestosData.map(puesto => {
            if (puesto.nombrePuesto === selectedPuesto) {
              const existingPointIndex = puesto.puntos.findIndex(punto => punto.numeroPunto === nuevoNumeroPunto);
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
