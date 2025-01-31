// hooks/useNavegacion.ts
import { useState, useEffect } from "react";
import { Area, Punto } from "@/app/types/areasTypes";

export const useNavegacion = (areas: Area[]) => {
  const [globalPointCounter, setGlobalPointCounter] = useState<number>(1);
  const [selectedPoint, setSelectedPoint] = useState<Punto | null>(null);

  // 🔹 Función para cargar datos desde localStorage
  useEffect(() => {
    try {
      const savedAreas: Area[] = JSON.parse(localStorage.getItem("areas") || "[]");
      const lastPoint = savedAreas
        .flatMap(area => area.puestosData.flatMap(puesto => puesto.puntos))
        .pop();

      if (lastPoint) {
        setGlobalPointCounter(lastPoint.numeroPunto);
        setSelectedPoint(lastPoint);
      } else {
        setGlobalPointCounter(1);
        setSelectedPoint(null);
      }
    } catch (error) {
      console.error("Error al cargar datos desde localStorage:", error);
      setGlobalPointCounter(1);
      setSelectedPoint(null);
    }
  }, []);

  // 🔹 Función para cambiar entre puntos (navegación)
  const navigateToPoint = (direction: "next" | "previous"): Punto | null => {
    const allPoints = areas
      .flatMap(area => area.puestosData.flatMap(puesto => puesto.puntos))
      .sort((a, b) => a.numeroPunto - b.numeroPunto);

    if (allPoints.length === 0) return null;

    const currentIndex = allPoints.findIndex(punto => punto.numeroPunto === globalPointCounter);
    if (currentIndex === -1) return null;

    const newIndex = direction === "next"
      ? Math.min(currentIndex + 1, allPoints.length - 1)
      : Math.max(currentIndex - 1, 0);

    const newPoint = allPoints[newIndex];
    setGlobalPointCounter(newPoint.numeroPunto);
    setSelectedPoint(newPoint);

    // ✅ Guardar el punto actual en localStorage para que se mantenga
    localStorage.setItem("currentPoint", JSON.stringify(newPoint));

    return newPoint;
  };

  // 🔹 Cargar el punto seleccionado al iniciar
  useEffect(() => {
    const savedPoint = localStorage.getItem("currentPoint");
    if (savedPoint) {
      setSelectedPoint(JSON.parse(savedPoint));
    }
  }, []);

  return {
    globalPointCounter,
    setGlobalPointCounter,
    selectedPoint,
    navigateToPoint,
  };
};
