import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Punto {
  numeroPunto: number;
  departamento: string;
  identificacion: string;
  planoTrabajo: string;
  tipoIluminacion: string;
  nivelIluminacion: number | string;
  mediciones?: {
    hora: string;
    trabajoE1: string;
    trabajoE2: string;
    paredesE1: string;
    paredesE2: string;
  }[];
}

interface Puesto {
  nombrePuesto: string;
  puntos: Punto[];
}

interface Area {
  idArea: number;
  nombreArea: string;
  identificacionData: {
    areaIluminada: string;
  };
  puestosData: Puesto[];
}

interface ResumenPuntosProps {
  areas: Area[];
  onEditPunto: (areaIndex: number, puestoIndex: number, puntoIndex: number) => void;
  onDeletePunto: (areaIndex: number, puestoIndex: number, puntoIndex: number) => void;
}

const ResumenPuntos: React.FC<ResumenPuntosProps> = ({ areas, onEditPunto, onDeletePunto }) => {
  const [expandedIndex, setExpandedIndex] = useState<{ areaIndex: number; puestoIndex: number; puntoIndex: number } | null>(null);

  const toggleExpand = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    console.log("📌 Expandiendo punto:", { areaIndex, puestoIndex, puntoIndex });

    if (
      expandedIndex &&
      expandedIndex.areaIndex === areaIndex &&
      expandedIndex.puestoIndex === puestoIndex &&
      expandedIndex.puntoIndex === puntoIndex
    ) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex({ areaIndex, puestoIndex, puntoIndex });
    }
  };

  console.log("🔍 Datos de áreas en ResumenPuntos:", areas);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      {areas.map((area, areaIndex) =>
        area.puestosData.map((puesto, puestoIndex) =>
          puesto.puntos.map((punto, puntoIndex) => (
            <div
              key={`${area.idArea}-${puestoIndex}-${puntoIndex}`}
              className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-500"
            >
              <div
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                onClick={() => toggleExpand(areaIndex, puestoIndex, puntoIndex)}
              >
                <span className="text-2xl font-bold text-gray-700">
                  Punto {punto.numeroPunto} - Área {area.identificacionData.areaIluminada || area.nombreArea}
                </span>
                <div className="flex items-center space-x-12">
                  <div
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      const confirmDelete = window.confirm(
                        `¿Estás seguro de que deseas borrar el Punto ${punto.numeroPunto} del Área ${area.nombreArea}?`
                      );
                      if (confirmDelete) {
                        onDeletePunto(areaIndex, puestoIndex, puntoIndex);
                      }
                    }}
                  >
                    <FiTrash2 className="text-2xl" />
                  </div>
                  <div
                    className="text-green-500 hover:text-green-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPunto(areaIndex, puestoIndex, puntoIndex);
                    }}
                  >
                    <FiEdit className="text-2xl" />
                  </div>
                </div>
              </div>

              {expandedIndex?.areaIndex === areaIndex &&
                expandedIndex.puestoIndex === puestoIndex &&
                expandedIndex.puntoIndex === puntoIndex && (
                  <div className="p-6 bg-white">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalles del Punto:</h3>
                      <p>
                        <strong>Área:</strong> {area.identificacionData.areaIluminada || area.nombreArea}
                      </p>
                      <p>
                        <strong>Identificación:</strong> {punto.identificacion}
                      </p>
                      <p>
                        <strong>Departamento:</strong> {punto.departamento}
                      </p>
                      <p>
                        <strong>Puesto:</strong> {puesto.nombrePuesto}
                      </p>
                      <p>
                        <strong>Tipo de Iluminación:</strong> {punto.tipoIluminacion}
                      </p>
                      <p>
                        <strong>Nivel de Iluminación:</strong> {punto.nivelIluminacion}
                      </p>
                    </div>

                    <div className="mb-4 overflow-x-auto">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Mediciones:</h3>
                      {Array.isArray(punto.mediciones) && punto.mediciones.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border p-2">Hora</th>
                              <th className="border p-2">P. DE TRABAJO E1</th>
                              <th className="border p-2">P. DE TRABAJO E2</th>
                              <th className="border p-2">PAREDES E1</th>
                              <th className="border p-2">PAREDES E2</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(punto.mediciones ?? []).map((medicion, medicionIndex) => (
                              <tr key={medicionIndex}>
                                <td className="border p-2">{medicion.hora || "N/A"}</td>
                                <td className="border p-2">{medicion.trabajoE1 || "N/A"}</td>
                                <td className="border p-2">{medicion.trabajoE2 || "N/A"}</td>
                                <td className="border p-2">{medicion.paredesE1 || "N/A"}</td>
                                <td className="border p-2">{medicion.paredesE2 || "N/A"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-red-500">⚠️ No hay mediciones registradas para este punto.</p>
                      )}
                    </div>
                  </div>
                )}
            </div>
          ))
        )
      )}
    </div>
  );
};

export default ResumenPuntos;
