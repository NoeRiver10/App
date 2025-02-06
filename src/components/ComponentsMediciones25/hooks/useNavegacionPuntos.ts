import { Dispatch, SetStateAction } from "react";
import { useGetAreas } from "./useAreas";

interface UseNavegacionPuntosProps {
  selectedArea: string;
  selectedPuesto: string;
  globalPointCounter: number;
  setGlobalPointCounter: Dispatch<SetStateAction<number>>;
}

// 📌 Hook para manejar la navegación entre puntos
export function useNavegacionPuntos({
  selectedArea,
  selectedPuesto,
  globalPointCounter,
  setGlobalPointCounter,
}: UseNavegacionPuntosProps) {
  const { areas } = useGetAreas();

  const navigateToPoint = (direction: "next" | "previous") => {
    const area = areas.find((a) => a.idArea.toString() === selectedArea);
    if (!area) return;

    const puesto = area.puestosData.find((p) => p.nombrePuesto === selectedPuesto);
    if (!puesto || puesto.puntos.length === 0) return;

    let newPointCounter = globalPointCounter;

    if (direction === "next" && globalPointCounter < puesto.puntos.length) {
      newPointCounter += 1;
    } else if (direction === "previous" && globalPointCounter > 1) {
      newPointCounter -= 1;
    }

    console.log(`🔄 Navegando al punto ${newPointCounter}`);
    setGlobalPointCounter(newPointCounter);
  };

  return { navigateToPoint };
}
