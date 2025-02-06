"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface Medicion {
  hora: string;
  trabajoE1: string;
  trabajoE2: string;
  paredesE1: string;
  paredesE2: string;
}

interface MedicionProps {
  tipoMedicion: string;
  numMediciones: number;
  areaId: number;
  puestoIndex: number;
  puntoIndex: number;
  medicionesData: Medicion[];
  setMedicionesData: React.Dispatch<React.SetStateAction<Medicion[]>>;
}

const MedicionesGeneral: React.FC<MedicionProps> = ({
  tipoMedicion,
  numMediciones,
  medicionesData,
  setMedicionesData,
  areaId,
  puestoIndex,
  puntoIndex,
}) => {
  const storageKey = `mediciones-area-${areaId}-puesto-${puestoIndex}-punto-${puntoIndex}`;

  // 📌 Referencia para evitar render innecesario
  const prevPuntoIndex = useRef<number | null>(null);

  // 📌 Cargar datos desde localStorage
  const loadDataFromStorage = useCallback((): Medicion[] => {
    try {
      const savedData = localStorage.getItem(storageKey);
      return savedData ? JSON.parse(savedData) : [...medicionesData];
    } catch (error) {
      console.error("Error cargando datos desde localStorage:", error);
      return [...medicionesData];
    }
  }, [storageKey, medicionesData]);

  // 📌 Estado local de mediciones
  const [localData, setLocalData] = useState<Medicion[]>(() => loadDataFromStorage());

  // 📌 Cargar datos solo cuando cambia de punto
  useEffect(() => {
    if (prevPuntoIndex.current !== puntoIndex) {
      prevPuntoIndex.current = puntoIndex;
      setLocalData(loadDataFromStorage());
    }
  }, [puntoIndex, loadDataFromStorage]);

  // 📌 Guardar en localStorage cuando los datos cambien
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(localData));
    setMedicionesData(localData); // 🔹 Ahora sí se usa correctamente
  }, [localData, storageKey, setMedicionesData]);
  
  // 📌 Actualizar los datos si cambia el número de mediciones
  useEffect(() => {
    setLocalData((prevData) => {
      return Array.from({ length: numMediciones }, (_, index) => ({
        hora: prevData[index]?.hora || "",
        trabajoE1: prevData[index]?.trabajoE1 || "",
        trabajoE2: prevData[index]?.trabajoE2 || "",
        paredesE1: prevData[index]?.paredesE1 || "",
        paredesE2: prevData[index]?.paredesE2 || "",
      }));
    });
  }, [numMediciones]);

  // 📌 Manejar cambios en los inputs
  const handleInputChange = (index: number, field: keyof Medicion, value: string) => {
    setLocalData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [field]: value };
      return updatedData;
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Medición {tipoMedicion}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-red-600 text-white">
              {numMediciones > 1 && <th className="border p-3">Medición No.</th>}
              <th className="border p-3">Hora</th>
              <th className="border p-3">P. DE TRABAJO E1</th>
              <th className="border p-3">P. DE TRABAJO E2</th>
              <th className="border p-3">PAREDES E1</th>
              <th className="border p-3">PAREDES E2</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((medicion, index) => (
              <tr key={index}>
                {numMediciones > 1 && (
                  <td className="border p-3 text-center font-bold text-blue-600">
                    Medición No. {index + 1}
                  </td>
                )}
                <td className="border p-3">
                  <input
                    type="time"
                    value={medicion.hora}
                    onChange={(e) => handleInputChange(index, "hora", e.target.value)}
                    className="w-full p-2 border rounded-md text-xs sm:text-sm"
                    step="60"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    value={medicion.trabajoE1}
                    onChange={(e) => handleInputChange(index, "trabajoE1", e.target.value)}
                    className="w-full p-2 border rounded-md text-xs sm:text-sm"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    value={medicion.trabajoE2}
                    onChange={(e) => handleInputChange(index, "trabajoE2", e.target.value)}
                    className="w-full p-2 border rounded-md text-xs sm:text-sm"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    value={medicion.paredesE1}
                    onChange={(e) => handleInputChange(index, "paredesE1", e.target.value)}
                    className="w-full p-2 border rounded-md text-xs sm:text-sm"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    value={medicion.paredesE2}
                    onChange={(e) => handleInputChange(index, "paredesE2", e.target.value)}
                    className="w-full p-2 border rounded-md text-xs sm:text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicionesGeneral;
