import React from "react";

interface FormularioMedicionesProps {
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  selectedPuesto: string;
  setSelectedPuesto: (value: string) => void;
  identificacion: string;
  setIdentificacion: (value: string) => void;
  departamento: string;
  setDepartamento: (value: string) => void;
  planoTrabajo: string;
  setPlanoTrabajo: (value: string) => void;
  nivelIluminacion: number | "";
  setNivelIluminacion: (value: number | "") => void;
  tipoIluminacion: string;
  setTipoIluminacion: (value: string) => void;
  areas: { 
    idArea: number; 
    nombreArea: string; 
    identificacionData?: { areaIluminada?: string };
  }[];
  puestosTrabajo: string[];
}

const NIVELES_ILUMINACION = [20, 50, 100, 200, 300, 500, 750, 1000, 2000];

const FormularioMediciones: React.FC<FormularioMedicionesProps> = ({
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
  areas,
  puestosTrabajo,
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      {/* Selector de área con el área iluminada en cada opción */}
      <select
        value={selectedArea}
        onChange={(e) => {
          setSelectedArea(e.target.value);
          setSelectedPuesto(""); // Reiniciar puesto al cambiar área
        }}
        className="p-3 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Seleccione un área
        </option>
        {areas.map((area) => (
          <option key={area.idArea} value={area.idArea.toString()}>
            {area.nombreArea} - {area.identificacionData?.areaIluminada || "Sin información"}
          </option>
        ))}
      </select>

      <select
        value={selectedPuesto}
        onChange={(e) => setSelectedPuesto(e.target.value)}
        className="p-3 border border-gray-300 rounded-md"
        disabled={!selectedArea}
      >
        <option value="" disabled>
          Seleccione un puesto
        </option>
        {puestosTrabajo.map((puesto, index) => (
          <option key={index} value={puesto}>
            {puesto}
          </option>
        ))}
      </select>

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

export default FormularioMediciones;
