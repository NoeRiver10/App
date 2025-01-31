import React from "react";
import FormularioSeleccion from "@/components/ComponentsMediciones25/FormularioSeleccion";
import { Area, Punto } from "@/app/types/areasTypes";

interface FormularioMedicionesProps {
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  selectedPuesto: string;
  setSelectedPuesto: (value: string) => void;
  departamento: string;
  setDepartamento: (value: string) => void;
  identificacion: string;
  setIdentificacion: (value: string) => void;
  planoTrabajo: string;
  setPlanoTrabajo: (value: string) => void;
  nivelIluminacion: number | "";
  setNivelIluminacion: (value: number | "") => void;
  tipoIluminacion: string;
  setTipoIluminacion: (value: string) => void;
  puestosTrabajo: string[];
  areas: Area[];
  NIVELES_ILUMINACION: number[];
  selectedPoint: Punto | null;
}

export const FormularioMediciones: React.FC<FormularioMedicionesProps> = ({
  selectedArea,
  setSelectedArea,
  selectedPuesto,
  setSelectedPuesto,
  departamento,
  setDepartamento,
  identificacion,
  setIdentificacion,
  planoTrabajo,
  setPlanoTrabajo,
  nivelIluminacion,
  setNivelIluminacion,
  tipoIluminacion,
  setTipoIluminacion,
  puestosTrabajo,
  areas,
  NIVELES_ILUMINACION,
  selectedPoint,
}) => {
  // 🔹 Buscar el área correspondiente según el `idArea`
  const areaActual = areas.find((area) => area.idArea.toString() === selectedArea);

  return (
    <div className="flex flex-col space-y-4 mb-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
        {selectedPoint
          ? `Punto ${selectedPoint.numeroPunto} - Área: ${areaActual?.identificacionData.areaIluminada || "No asignada"}`
          : "Cargando..."}
      </h1>

      {/* Selección de Área y Puesto */}
      <FormularioSeleccion
        formData={{ selectedArea, selectedPuesto }}
        updateField={(field, value) => {
          if (field === "selectedArea") {
            setSelectedArea(value);
            setSelectedPuesto("");
          }
          if (field === "selectedPuesto") setSelectedPuesto(value);
        }}
        areas={areas}
        puestosTrabajo={puestosTrabajo}
      />

      {/* Campos de medición */}
      <input
        type="text"
        value={departamento}
        onChange={(e) => setDepartamento(e.target.value)}
        placeholder="Departamento"
        className="p-3 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={identificacion}
        onChange={(e) => setIdentificacion(e.target.value)}
        placeholder="Identificación"
        className="p-3 border border-gray-300 rounded-md"
      />
      <select
        value={planoTrabajo}
        onChange={(e) => setPlanoTrabajo(e.target.value)}
        className="p-3 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Seleccione Plano de Trabajo
        </option>
        <option value="HORIZONTAL">Horizontal</option>
        <option value="VERTICAL">Vertical</option>
        <option value="OBLICUO">Oblicuo</option>
      </select>
      <select
        value={nivelIluminacion}
        onChange={(e) => setNivelIluminacion(Number(e.target.value) || "")}
        className="p-3 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Seleccione Nivel de Iluminación
        </option>
        {NIVELES_ILUMINACION.map((nivel) => (
          <option key={nivel} value={nivel}>
            {nivel} lux
          </option>
        ))}
      </select>
      <select
        value={tipoIluminacion}
        onChange={(e) => setTipoIluminacion(e.target.value)}
        className="p-3 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Seleccione Tipo de Iluminación
        </option>
        <option value="NATURAL">Natural</option>
        <option value="ARTIFICIAL">Artificial</option>
        <option value="COMBINADA">Combinada</option>
      </select>
    </div>
  );
};
