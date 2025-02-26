import React from "react";
import { useAreas } from "@/app/context/context25/areascontext";
import { useRouter } from "next/navigation"; // ✅ Agregamos useRouter para navegar
import ResumenPuntos from "./ResumenPuntos";
import ExportarExcel from "@/components/ComponentsMediciones25/Excel/ExportarExcel";

const ResumenMedicion: React.FC = () => {
  const { areas, setAreas } = useAreas();
  const router = useRouter(); // ✅ Para navegar a la pantalla de edición

  // 📌 Eliminar un punto de forma segura
  const handleDeletePunto = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    if (
      areaIndex >= 0 &&
      areaIndex < areas.length &&
      puestoIndex >= 0 &&
      puestoIndex < areas[areaIndex].puestosData.length &&
      puntoIndex >= 0 &&
      puntoIndex < areas[areaIndex].puestosData[puestoIndex].puntos.length
    ) {
      setAreas((prevAreas) => {
        const updatedAreas = [...prevAreas];
        updatedAreas[areaIndex].puestosData[puestoIndex].puntos.splice(puntoIndex, 1);

        // 🚀 Si el puesto queda vacío, lo eliminamos
        if (updatedAreas[areaIndex].puestosData[puestoIndex].puntos.length === 0) {
          updatedAreas[areaIndex].puestosData.splice(puestoIndex, 1);
        }

        // 🚀 Si el área se queda sin puestos, también la eliminamos
        if (updatedAreas[areaIndex].puestosData.length === 0) {
          updatedAreas.splice(areaIndex, 1);
        }

        return updatedAreas;
      });
    } else {
      console.error("Índices fuera de rango para eliminar un punto");
    }
  };

  // 📌 Editar un punto y redirigir a la pantalla de edición
  const handleEditPunto = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    if (
      areaIndex >= 0 &&
      areaIndex < areas.length &&
      puestoIndex >= 0 &&
      puestoIndex < areas[areaIndex].puestosData.length &&
      puntoIndex >= 0 &&
      puntoIndex < areas[areaIndex].puestosData[puestoIndex].puntos.length
    ) {
      // ✅ Redirige a la página de mediciones con los parámetros correctos
      router.push(
        `/Nom25/Mediciones?area=${areas[areaIndex].idArea}&puesto=${puestoIndex}&punto=${puntoIndex}`
      );
    } else {
      console.error("Índices fuera de rango para editar un punto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">Resumen de Mediciones</h1>

      {/* ✅ Mostrar Resumen de Puntos con las funciones de edición y eliminación */}
      <ResumenPuntos areas={areas} onEditPunto={handleEditPunto} onDeletePunto={handleDeletePunto} />

      {/* ✅ Botón para exportar datos */}
      <div className="mt-8 flex justify-center">
        <ExportarExcel areas={areas} />
      </div>
    </div>
  );
};

export default ResumenMedicion;
