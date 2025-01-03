"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface IdentificacionData {
  idArea: string;
  areaIluminada: string;
  descripcionSuperficie: string;
}

export interface DimensionesData {
  altura: string;
  largo: string;
  ancho: string;
  indiceArea: number;
}

export interface LuminariasData {
  tipoLuminaria: string;
  potencia: number;
  distribucion: string;
  iluminacionLocalizada: string;
  cantidad: number;
}

export interface PercepcionData {
  nombreTrabajador: string;
  descripcion: string;
  puesto: string;
}

export interface Punto {
  numeroPunto: number;
  identificacion: string;
  departamento: string;
  planoTrabajo: string;
  nivelIluminacion: number | "";
  tipoIluminacion: string;
  mediciones: {
    hora: string;
    trabajoE1: string;
    trabajoE2: string;
    paredesE1: string | "N/A";
    paredesE2: string | "N/A";
  }[];
}

export interface PuestoData {
  indice: number;
  nombrePuesto: string;
  numTrabajadores: number;
  descripcionActividades: string;
  nivelSeleccionado?: number | string;
  puntos: Punto[];
}

export interface Area {
  idArea: number;
  nombreArea: string;
  identificacionData: IdentificacionData;
  dimensionesData: DimensionesData;
  luminariasData: LuminariasData;
  percepcionData: PercepcionData;
  puestosData: PuestoData[];
}

interface AreasContextProps {
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
}

const AreasContext = createContext<AreasContextProps | undefined>(undefined);

export const useAreas = () => {
  const context = useContext(AreasContext);
  if (!context) {
    throw new Error('useAreas debe ser usado dentro de un AreasProvider');
  }
  return context;
};

export const AreasProvider = ({ children }: { children: ReactNode }) => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const storedAreas = localStorage.getItem('areas');
    if (storedAreas) {
      try {
        const parsedAreas: Area[] = JSON.parse(storedAreas);
        setAreas(parsedAreas);
      } catch (error) {
        console.error('Error al parsear las áreas almacenadas:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (areas.length > 0) {
      try {
        localStorage.setItem('areas', JSON.stringify(areas));
      } catch (error) {
        console.error('Error al guardar áreas en localStorage:', error);
      }
    }
  }, [areas]);

  return (
    <AreasContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreasContext.Provider>
  );
};
