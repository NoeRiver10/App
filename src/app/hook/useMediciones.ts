// hooks/useMediciones.ts
import { useState, useEffect, useMemo } from "react";
import { Area, Punto } from "@/app/types/areasTypes";

const createMedicionesData = (tipo: string) =>
  Array.from({ length: tipo === "ARTIFICIAL" ? 1 : 4 }, () => ({
    hora: "",
    trabajoE1: "",
    trabajoE2: "",
    paredesE1: "N/A",
    paredesE2: "N/A",
  }));

export function useMediciones(areas: Area[]) {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedPuesto, setSelectedPuesto] = useState<string>("");
  const [identificacion, setIdentificacion] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [planoTrabajo, setPlanoTrabajo] = useState<string>("");
  const [nivelIluminacion, setNivelIluminacion] = useState<number | "">("");
  const [tipoIluminacion, setTipoIluminacion] = useState<string>("");
  const [medicionesData, setMedicionesData] = useState(() => createMedicionesData(""));

  useEffect(() => {
    setMedicionesData(createMedicionesData(tipoIluminacion));
  }, [tipoIluminacion]);

  const puestosTrabajo = useMemo(() => {
    const area = areas.find((area) => area.idArea.toString() === selectedArea);
    return area?.puestosData.map((puesto) => puesto.nombrePuesto) || [];
  }, [selectedArea, areas]);

  const resetInputs = () => {
    setIdentificacion("");
    setPlanoTrabajo("");
    setNivelIluminacion("");
    setTipoIluminacion("");
    setMedicionesData(createMedicionesData(""));
  };

  const NIVELES_ILUMINACION = [20, 50, 100, 200, 300, 500, 750, 1000, 2000];

  // Función para actualizar los datos del formulario con un punto específico
  const updatePointData = (point: Punto) => {
    setIdentificacion(point.identificacion);
    setDepartamento(point.departamento);
    setPlanoTrabajo(point.planoTrabajo);
    setNivelIluminacion(point.nivelIluminacion);
    setTipoIluminacion(point.tipoIluminacion);
    setMedicionesData(point.mediciones || createMedicionesData(""));
  };

  return {
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
    medicionesData,
    setMedicionesData,
    puestosTrabajo,
    resetInputs,
    NIVELES_ILUMINACION,
    updatePointData, // Exportar la función para actualizar datos
  };
}