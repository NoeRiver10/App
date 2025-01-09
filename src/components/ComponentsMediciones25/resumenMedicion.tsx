import React from "react";
import { useAreas } from "@/app/context/context25/areascontext";
import ResumenPuntos from "./ResumenPuntos";
import ExportarExcel from "@/components/ComponentsMediciones25/Excel/ExportarExcel"; // Importación correcta

const ResumenMedicion: React.FC = () => {
  const { areas, setAreas } = useAreas();

  // Eliminar un punto con validaciones
  const handleDeletePunto = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    if (
      areaIndex >= 0 &&
      areaIndex < areas.length &&
      puestoIndex >= 0 &&
      puestoIndex < areas[areaIndex].puestosData.length &&
      puntoIndex >= 0 &&
      puntoIndex < areas[areaIndex].puestosData[puestoIndex].puntos.length
    ) {
      const updatedAreas = [...areas];
      updatedAreas[areaIndex].puestosData[puestoIndex].puntos.splice(puntoIndex, 1);
      setAreas(updatedAreas);
    } else {
      console.error("Índices fuera de rango para eliminar un punto");
    }
  };

  // Editar un punto (placeholder para futuras implementaciones)
  const handleEditPunto = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    console.log(`Editando punto: Área ${areaIndex}, Puesto ${puestoIndex}, Punto ${puntoIndex}`);
    // Aquí podrías redirigir al usuario a una página o formulario para editar el punto
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">Resumen de Mediciones</h1>

      {/* Mostrar Resumen de Puntos */}
      <ResumenPuntos areas={areas} onEditPunto={handleEditPunto} onDeletePunto={handleDeletePunto} />
      
      {/* Botón para exportar datos */}
      <div className="mt-8 flex justify-center">
        <ExportarExcel areas={areas} />
      </div>
    </div>
  );
};

export default ResumenMedicion;
