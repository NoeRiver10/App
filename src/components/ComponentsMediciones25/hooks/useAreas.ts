import { useAreas } from "@/app/context/context25/areascontext";
import { Area } from "@/app/types/areasTypes";

// 📌 Hook para obtener y manejar áreas desde el contexto
export function useGetAreas() {
  const { areas, setAreas } = useAreas();

  const getAreaById = (id: string): Area | undefined => {
    return areas.find((area) => area.idArea.toString() === id);
  };

  return { areas, setAreas, getAreaById };
}
