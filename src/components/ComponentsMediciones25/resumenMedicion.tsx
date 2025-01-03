import React from 'react';
import { useAreas } from '@/app/context/context25/areascontext';
import ResumenPuntos from './ResumenPuntos';
import ExportarDatos from './exportar_excel';

const ResumenMedicion: React.FC = () => {
  const { areas, setAreas } = useAreas();

  const handleDeletePunto = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    const updatedAreas = [...areas];
    updatedAreas[areaIndex].puestosData[puestoIndex].puntos.splice(puntoIndex, 1);
    setAreas(updatedAreas);
  };

  const handleEditPunto = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    console.log(`Editando punto: ${areaIndex}-${puestoIndex}-${puntoIndex}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">Resumen de Mediciones</h1>
      <ResumenPuntos areas={areas} onEditPunto={handleEditPunto} onDeletePunto={handleDeletePunto} />
      <ExportarDatos areas={areas} />
    </div>
  );
};

export default ResumenMedicion;
