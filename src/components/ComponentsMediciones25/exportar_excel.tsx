import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface Medicion {
  hora: string;
  trabajoE1: string;
  trabajoE2: string;
  paredesE1: string;
  paredesE2: string;
}

interface Punto {
  departamento: string;
  identificacion: string;
  planoTrabajo: string;
  tipoIluminacion: string;
  nivelIluminacion: string | number;
  mediciones: Medicion[];
}

interface Puesto {
  nombrePuesto: string;
  puntos: Punto[];
}
interface Area {
  nombreArea: string;
  identificacionData?: {
    areaIluminada: string;
  };
  puestosData: Puesto[];
}


interface ExportarDatosProps {
  areas: Area[];
}

const ExportarDatos: React.FC<ExportarDatosProps> = ({ areas }) => {
  const exportarDatos = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Mediciones");

      // Encabezados generales
      worksheet.mergeCells("A1:A2");
      worksheet.mergeCells("B1:B2");
      worksheet.mergeCells("C1:C2");
      worksheet.mergeCells("D1:D2");
      worksheet.mergeCells("E1:E2");
      worksheet.mergeCells("F1:F2");
      worksheet.mergeCells("G1:G2");
      worksheet.mergeCells("H1:H2");
      worksheet.mergeCells("I1:I2");
      worksheet.mergeCells("J1:J2");
      worksheet.mergeCells("K1:K2");

      const encabezadosGenerales = [
        "Med.", "Fecha de muestreo", "Departamento", "Área", "Puesto de trabajo",
        "Identificación", "Plano de trabajo", "Tarea o actividad", "Tipo de iluminación",
        "Observaciones", "Rango",
      ];

      // Escribir encabezados generales en la primera fila
      worksheet.getRow(1).values = encabezadosGenerales;

      // Estilo para los encabezados generales
      encabezadosGenerales.forEach((_, index) => {
        const cell = worksheet.getCell(1, index + 1);
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "000000" }, // Fondo negro
        };
        cell.font = { color: { argb: "FFFFFF" }, bold: true }; // Texto blanco
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });

      // Encabezados para las mediciones
      const encabezadosMediciones = ["Medición No. 1", "Medición No. 2", "Medición No. 3", "Medición No. 4"];
      const subencabezados = ["Hora", "Plano E1", "Plano E2", "Paredes E1", "Paredes E2"];

      encabezadosMediciones.forEach((titulo, index) => {
        const startCol = 12 + index * 5; // Columna inicial para cada medición
        const endCol = startCol + 4; // Columna final para cada medición
        worksheet.mergeCells(1, startCol, 1, endCol); // Combina las celdas de los títulos principales
        const cell = worksheet.getCell(1, startCol);
        cell.value = titulo;
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: ["A9D08E", "9BC2E6", "F4B084", "FF6D6D"][index] }, // Colores para los títulos principales
        };
        cell.font = { color: { argb: "FFFFFF" }, bold: true };

        // Subencabezados para cada medición
        subencabezados.forEach((sub, subIndex) => {
          const subCell = worksheet.getCell(2, startCol + subIndex);
          subCell.value = sub;
          subCell.alignment = { horizontal: "center", vertical: "middle" };
          subCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D9EAD3" }, // Fondo claro para subencabezados
          };
          subCell.font = { bold: true };
        });
      });

      // Añadir datos de cada punto de medición
      areas.forEach((area) => {
        area.puestosData.forEach((puesto) => {
          puesto.puntos.forEach((punto) => {
            const fila = [
              "", "00-ene-00", punto.departamento, area.identificacionData?.areaIluminada || area.nombreArea, puesto.nombrePuesto,
              punto.identificacion, punto.planoTrabajo, punto.nivelIluminacion, // "Tarea o actividad" recibe "Nivel de iluminación"
              punto.tipoIluminacion, "", "", // "Observaciones" y "Rango" vacíos
            ];
            for (let i = 0; i < 4; i++) {
              const medicion = punto.mediciones[i] || {
                hora: "",
                trabajoE1: "",
                trabajoE2: "",
                paredesE1: "N/A",
                paredesE2: "N/A",
              };
              fila.push(
                medicion.hora,
                medicion.trabajoE1,
                medicion.trabajoE2,
                medicion.paredesE1,
                medicion.paredesE2
              );
            }

            worksheet.addRow(fila);
          });
        });
      });

      // Ajustar ancho de columnas automáticamente
      worksheet.columns.forEach((column) => {
        if (column) {
          let maxLength = 0;
          column.eachCell?.({ includeEmpty: true }, (cell) => {
            if (cell.value) {
              const length = cell.value.toString().length;
              if (length > maxLength) maxLength = length;
            }
          });
          column.width = maxLength + 2;
        }
      });

      // Exportar el archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "resumen_mediciones_formato.xlsx");
    } catch (error) {
      console.error("Error al exportar datos:", error);
      alert("Hubo un error al exportar los datos. Por favor, intenta nuevamente.");
    }
  };

  return (
    <button
      type="button"
      onClick={exportarDatos}
      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg transition transform hover:scale-105"
    >
      Exportar a Excel
    </button>
  );
};

export default ExportarDatos;
