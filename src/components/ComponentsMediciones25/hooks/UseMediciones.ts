import { useState, useEffect, useMemo } from "react";
import { useGetAreas } from "./useAreas";
import { useGuardarPunto } from "./useGuardarPunto";
import { useNavegacionPuntos } from "./useNavegacionPuntos";

// ✅ Función auxiliar para crear datos de medición
const createMedicionesData = (tipo: string) =>
  Array.from({ length: tipo === "ARTIFICIAL" ? 1 : 4 }, () => ({
    hora: "",
    trabajoE1: "",
    trabajoE2: "",
    paredesE1: "N/A",
    paredesE2: "N/A",
  }));

export function useMediciones() {
  const { areas, setAreas } = useGetAreas(); // ✅ Obtener `areas` y `setAreas`

  // 📌 Estados principales
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedPuesto, setSelectedPuesto] = useState<string>("");
  const [identificacion, setIdentificacion] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [planoTrabajo, setPlanoTrabajo] = useState<string>("");
  const [nivelIluminacion, setNivelIluminacion] = useState<number | "">("");
  const [tipoIluminacion, setTipoIluminacion] = useState<string>("");
  const [globalPointCounter, setGlobalPointCounter] = useState<number>(1);
  const [showResumen, setShowResumen] = useState<boolean>(false);
  const [medicionesData, setMedicionesData] = useState(createMedicionesData(""));
  const [areaIluminada, setAreaIluminada] = useState<string>("");

  // 📌 Hook para manejar guardado de puntos
  const { handleGuardar } = useGuardarPunto({
    selectedArea,
    selectedPuesto,
    identificacion,
    departamento,
    planoTrabajo,
    nivelIluminacion,
    tipoIluminacion,
    medicionesData,
    globalPointCounter,
    setGlobalPointCounter, // ✅ Se pasó correctamente
    setAreas, // ✅ Ahora también pasamos `setAreas`
  });

  // 📌 Hook para manejar la navegación de puntos
  const { navigateToPoint } = useNavegacionPuntos({
    selectedArea,
    selectedPuesto,
    globalPointCounter,
    setGlobalPointCounter,
  });

  // 📌 Obtiene los puestos de trabajo dinámicamente según el área seleccionada
  const puestosTrabajo = useMemo(() => {
    const area = areas.find((a) => a.idArea.toString() === selectedArea);
    return area?.puestosData.map((p) => p.nombrePuesto) || [];
  }, [selectedArea, areas]);

  // 📌 Obtiene automáticamente el área iluminada al cambiar el área seleccionada
  useEffect(() => {
    const area = areas.find((a) => a.idArea.toString() === selectedArea);
    setAreaIluminada(area?.identificacionData?.areaIluminada ?? "Desconocida");
  }, [selectedArea, areas]);

  // 📌 Solo cambia el punto cuando se presiona "Agregar Punto"
  const handleAgregarPunto = () => {
    setGlobalPointCounter((prev) => prev + 1);
    setTipoIluminacion(""); // ✅ Solo se reinicia `tipoIluminacion`
    setMedicionesData(createMedicionesData("")); // ✅ Solo se reinician las mediciones
  };

  return {
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
    handleAgregarPunto, // ✅ Ahora `Agregar Punto` solo cambia aquí
    navigateToPoint, // ✅ Se agregó la función de navegación
  };
}
