"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Area } from "../../types/areasTypes"; // Ruta corregida

interface AreasContextProps {
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
}

const AreasContext = createContext<AreasContextProps | undefined>(undefined);

export const useAreas = () => {
  const context = useContext(AreasContext);
  if (!context) {
    throw new Error("useAreas debe ser usado dentro de un AreasProvider");
  }
  return context;
};

export const AreasProvider = ({ children }: { children: ReactNode }) => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const storedAreas = localStorage.getItem("areas");
    if (storedAreas) {
      try {
        const parsedAreas: Area[] = JSON.parse(storedAreas);
        setAreas(parsedAreas);
      } catch (error) {
        console.error("Error al parsear las áreas almacenadas:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (areas.length > 0) {
      try {
        localStorage.setItem("areas", JSON.stringify(areas));
      } catch (error) {
        console.error("Error al guardar áreas en localStorage:", error);
      }
    }
  }, [areas]);

  return (
    <AreasContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreasContext.Provider>
  );
};
