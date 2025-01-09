import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import ResumenArea from "./ResumenAreaExcel";
import ResumenMediciones from "./ResumenMediciones";
import { Area } from "@/app/types/areasTypes";

interface ExportarExcelProps {
  areas: Area[];
}

const ExportarExcel: React.FC<ExportarExcelProps> = ({ areas }) => {
  const exportarDatos = async () => {
    try {
      const workbook = new ExcelJS.Workbook();

      // Crear la hoja de Resumen por Áreas
      ResumenArea(workbook, areas);

      // Crear la hoja de Mediciones
      ResumenMediciones(workbook, areas);

      // Exportar el archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "resumen_mediciones.xlsx");
    } catch (error) {
      console.error("Error al exportar datos:", error);
      alert("Hubo un error al exportar los datos. Por favor, intenta nuevamente.");
    }
  };

  return (
    <button
      onClick={exportarDatos}
      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105"
    >
      Exportar a Excel
    </button>
  );
};

export default ExportarExcel;
