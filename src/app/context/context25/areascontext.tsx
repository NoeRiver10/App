"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Area } from "../../types/areasTypes";

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

  return (
    <AreasContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreasContext.Provider>
  );
};
