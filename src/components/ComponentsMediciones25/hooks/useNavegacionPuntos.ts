import { Dispatch, SetStateAction } from "react";
import { useGetAreas } from "./useAreas";

interface UseNavegacionPuntosProps {
  setSelectedArea: Dispatch<SetStateAction<string>>;
  setSelectedPuesto: Dispatch<SetStateAction<string>>;
  globalPointCounter: number;
  setGlobalPointCounter: Dispatch<SetStateAction<number>>;
}

export function useNavegacionPuntos({
  setSelectedArea,
  setSelectedPuesto,
  globalPointCounter,
  setGlobalPointCounter,
}: UseNavegacionPuntosProps) {
  const { areas } = useGetAreas();

  const getAllPoints = () => {
    return areas
      .flatMap(area =>
        area.puestosData.flatMap(puesto =>
          puesto.puntos.map(punto => ({
            numeroPunto: punto.numeroPunto,
            areaId: area.idArea.toString(),
            puestoNombre: puesto.nombrePuesto,
          }))
        )
      )
      .sort((a, b) => a.numeroPunto - b.numeroPunto);
  };

  const navigateToPoint = (direction: "next" | "previous") => {
    const allPoints = getAllPoints();
    const currentIndex = allPoints.findIndex(p => p.numeroPunto === globalPointCounter);

    if (currentIndex === -1) return;

    let newIndex = currentIndex;

    if (direction === "next" && currentIndex < allPoints.length - 1) {
      newIndex += 1;
    } else if (direction === "previous" && currentIndex > 0) {
      newIndex -= 1;
    }

    const newPoint = allPoints[newIndex];

    console.log(`🔄 Navegando a Punto ${newPoint.numeroPunto} - Área: ${newPoint.areaId} - Puesto: ${newPoint.puestoNombre}`);

    setGlobalPointCounter(newPoint.numeroPunto);
    setSelectedArea(newPoint.areaId);
    setSelectedPuesto(newPoint.puestoNombre);
  };

  return { navigateToPoint };
}
