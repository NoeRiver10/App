import ExcelJS from "exceljs";
import { Area } from "@/app/types/areasTypes";
const ResumenMediciones = (workbook: ExcelJS.Workbook, areas: Area[]) => {
  const worksheet = workbook.addWorksheet("Mediciones");

  // Encabezados generales
  const encabezadosGenerales = [
    "Med.", "Fecha de muestreo", "Departamento", "Área", "Puesto de trabajo",
    "Identificación", "Plano de trabajo", "Tarea o actividad", "Tipo de iluminación",
    "Observaciones", "Rango",
  ];

  // Agregar encabezados generales combinados
  encabezadosGenerales.forEach((header, index) => {
    const colIndex = index + 1;
    worksheet.mergeCells(1, colIndex, 2, colIndex); // Combinar filas 1 y 2
    const cell = worksheet.getCell(1, colIndex);
    cell.value = header;
    cell.alignment = { horizontal: "center", vertical: "middle" }; // Centrado horizontal y vertical
    cell.font = { bold: true, color: { argb: "FFFFFF" } }; // Texto blanco y negrita
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "000000" } }; // Fondo negro
  });

  // Encabezados de mediciones
  const encabezadosMediciones = ["Medición No. 1", "Medición No. 2", "Medición No. 3", "Medición No. 4"];
  const subencabezados = ["Hora", "Plano E1", "Plano E2", "Paredes E1", "Paredes E2"];

  encabezadosMediciones.forEach((titulo, index) => {
    const startCol = encabezadosGenerales.length + index * subencabezados.length + 1;
    const endCol = startCol + subencabezados.length - 1;

    // Combinar celdas para los títulos de las mediciones
    worksheet.mergeCells(1, startCol, 1, endCol);
    const cell = worksheet.getCell(1, startCol);
    cell.value = titulo;
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.font = { bold: true, color: { argb: "FFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: ["A9D08E", "9BC2E6", "F4B084", "FF6D6D"][index] }, // Colores alternados
    };

    // Subencabezados
    subencabezados.forEach((sub, subIndex) => {
      const subCell = worksheet.getCell(2, startCol + subIndex);
      subCell.value = sub;
      subCell.alignment = { horizontal: "center", vertical: "middle" };
      subCell.font = { bold: true };
      subCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "D9EAD3" } };
    });
  });

  // Añadir datos
  let rowIndex = 3; // Inicia en la fila 3 porque las dos primeras filas son encabezados
  areas.forEach((area) => {
    area.puestosData.forEach((puesto) => {
      puesto.puntos.forEach((punto) => {
        const fila = [
          rowIndex - 2, // Número de medición
          "00-ene-00", // Fecha de muestreo
          punto.departamento, // Departamento
          area.identificacionData?.areaIluminada || area.nombreArea, // Área
          puesto.nombrePuesto, // Puesto de trabajo
          punto.identificacion, // Identificación
          punto.planoTrabajo, // Plano de trabajo
          punto.nivelIluminacion?.toString() || "", // Tarea o actividad
          punto.tipoIluminacion, // Tipo de iluminación
          "", // Observaciones
          "", // Rango
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
        rowIndex++;
      });
    });
  });

  // Ajustar ancho de columnas automáticamente
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      if (cell.value) {
        const length = cell.value.toString().length;
        maxLength = Math.max(maxLength, length);
      }
    });
    column.width = maxLength + 2;
  });

  return worksheet;
};

export default ResumenMediciones;
