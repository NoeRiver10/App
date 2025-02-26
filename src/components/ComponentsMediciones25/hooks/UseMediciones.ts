import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useGetAreas } from "./useAreas";
import { useGuardarPunto } from "./useGuardarPunto";
import { useNavegacionPuntos } from "./useNavegacionPuntos";

const createMedicionesData = (tipo: string) =>
  Array.from({ length: tipo === "ARTIFICIAL" ? 1 : 4 }, () => ({
    hora: "",
    trabajoE1: "",
    trabajoE2: "",
    paredesE1: "N/A",
    paredesE2: "N/A",
  }));

export function useMediciones() {
  const searchParams = useSearchParams();
  const { areas, setAreas } = useGetAreas();

  const paramArea = searchParams.get("area");
  const paramPuesto = searchParams.get("puesto");
  const paramPunto = searchParams.get("punto");

  const [selectedArea, setSelectedArea] = useState<string>(paramArea || "");
  const [selectedPuesto, setSelectedPuesto] = useState<string>(paramPuesto || "");
  const [globalPointCounter, setGlobalPointCounter] = useState<number>(1);
  const [totalPuntos, setTotalPuntos] = useState<number>(1); // ✅ Se agregó correctamente
  
  const [identificacion, setIdentificacion] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [planoTrabajo, setPlanoTrabajo] = useState<string>("");
  const [nivelIluminacion, setNivelIluminacion] = useState<number | "">("");
  const [tipoIluminacion, setTipoIluminacion] = useState<string>("");
  const [showResumen, setShowResumen] = useState<boolean>(false);
  const [medicionesData, setMedicionesData] = useState(createMedicionesData(""));
  const [areaIluminada, setAreaIluminada] = useState<string>("");

  // 📌 Calcula el máximo número de punto globalmente para que la numeración sea consecutiva
  const calcularMaximoPunto = () => {
    return (
      Math.max(
        ...areas.flatMap(area =>
          area.puestosData.flatMap(puesto =>
            puesto.puntos.map(punto => punto.numeroPunto)
          )
        ),
        0
      ) + 1
    );
  };

  // 📌 Cargar datos del punto desde la URL (Resumen de Puntos)
  useEffect(() => {
    if (paramArea && paramPuesto && paramPunto) {
      const areaEncontrada = areas.find(a => a.idArea.toString() === paramArea);
      if (!areaEncontrada) return;

      const puestoEncontrado = areaEncontrada.puestosData[Number(paramPuesto)];
      if (!puestoEncontrado) return;

      const puntoEncontrado = puestoEncontrado.puntos.find(
        punto => punto.numeroPunto === Number(paramPunto)
      );
      if (!puntoEncontrado) return;

      setIdentificacion(puntoEncontrado.identificacion);
      setDepartamento(puntoEncontrado.departamento);
      setPlanoTrabajo(puntoEncontrado.planoTrabajo);
      setNivelIluminacion(puntoEncontrado.nivelIluminacion);
      setTipoIluminacion(puntoEncontrado.tipoIluminacion);
      setMedicionesData(puntoEncontrado.mediciones);
      setGlobalPointCounter(puntoEncontrado.numeroPunto);
    }
  }, [paramArea, paramPuesto, paramPunto, areas]);

  // 📌 Obtener el nombre del área iluminada
  useEffect(() => {
    const area = areas.find(a => a.idArea.toString() === selectedArea);
    setAreaIluminada(area?.identificacionData?.areaIluminada ?? "Desconocida");
  }, [selectedArea, areas]);

  // 📌 Guardar datos
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
    setTotalPuntos, // ✅ Se pasó correctamente
    setAreas,
  });

  // 📌 Navegación de puntos
  const { navigateToPoint } = useNavegacionPuntos({
    setSelectedArea,
    setSelectedPuesto,
    globalPointCounter,
    setGlobalPointCounter,
  });
  
  // 📌 Obtener los puestos de trabajo de un área seleccionada
  const puestosTrabajo = useMemo(() => {
    const area = areas.find(a => a.idArea.toString() === selectedArea);
    return area?.puestosData.map(p => p.nombrePuesto) || [];
  }, [selectedArea, areas]);

  // 📌 Manejar la creación de nuevos puntos con numeración global
  const handleAgregarPunto = () => {
    const siguientePunto = calcularMaximoPunto();
    setGlobalPointCounter(siguientePunto);
    setTotalPuntos(siguientePunto); // ✅ Asegurar que `totalPuntos` se mantiene actualizado
    setTipoIluminacion("");
    setMedicionesData(createMedicionesData(""));
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
    totalPuntos,
    setTotalPuntos,
    showResumen,
    setShowResumen,
    medicionesData,
    setMedicionesData,
    areaIluminada,
    puestosTrabajo,
    handleGuardar,
    handleAgregarPunto,
    navigateToPoint,
  };
}
