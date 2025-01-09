import ExcelJS from "exceljs";
import { Area } from "@/app/types/areasTypes";
const ResumenAreaExcel = (workbook: ExcelJS.Workbook, areas: Area[]) => {
  const worksheet = workbook.addWorksheet("Resumen por Áreas");

  // Configurar las filas del encabezado con combinación de celdas
  worksheet.mergeCells("A1:A2"); // ID de Área
  worksheet.getCell("A1").value = "ID DE ÁREA";
  worksheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("B1:B2"); // Área
  worksheet.getCell("B1").value = "ÁREA";
  worksheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("C1:C2"); // Descripción del Área Iluminada
  worksheet.getCell("C1").value =
    "DESCRIPCIÓN DEL ÁREA ILUMINADA (COLORES Y TIPO DE SUPERFICIES DEL LOCAL O EDIFICIO)";
  worksheet.getCell("C1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("D1:F1"); // Dimensiones del Área
  worksheet.getCell("D1").value = "DIMENSIONES DE ÁREA";
  worksheet.getCell("D1").alignment = { horizontal: "center", vertical: "middle" };
  worksheet.getCell("D1").font = { bold: true };

  worksheet.getCell("D2").value = "l [m]";
  worksheet.getCell("E2").value = "b [m]";
  worksheet.getCell("F2").value = "h [m]";
  ["D2", "E2", "F2"].forEach((cell) => {
    worksheet.getCell(cell).alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell(cell).font = { bold: true };
  });

  worksheet.mergeCells("G1:G2"); // Iluminación Localizada
  worksheet.getCell("G1").value = "ILUMINACIÓN LOCALIZADA (SI/NO)";
  worksheet.getCell("G1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("H1:H2"); // Potencia de Lámpara
  worksheet.getCell("H1").value = "POTENCIA DE LÁMPARA [W]";
  worksheet.getCell("H1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("I1:K1"); // Lámparas
  worksheet.getCell("I1").value = "LÁMPARAS";
  worksheet.getCell("I1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.getCell("I2").value = "TIPO";
  worksheet.getCell("J2").value = "DISTRIBUCIÓN";
  worksheet.getCell("K2").value = "CANTIDAD";
  ["I2", "J2", "K2"].forEach((cell) => {
    worksheet.getCell(cell).alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell(cell).font = { bold: true };
  });

  worksheet.mergeCells("L1:L2"); // Índice de Área (IC)
  worksheet.getCell("L1").value = "ÍNDICE DE ÁREA (IC)";
  worksheet.getCell("L1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("M1:M2"); // Número Mínimo de Zonas a Evaluar
  worksheet.getCell("M1").value = "NÚMERO MÍNIMO DE ZONAS A EVALUAR";
  worksheet.getCell("M1").alignment = { horizontal: "center", vertical: "middle" };

  worksheet.mergeCells("N1:N2"); // Número Máximo de Zonas a Evaluar
  worksheet.getCell("N1").value = "NÚMERO MÁXIMO DE ZONAS A EVALUAR";
  worksheet.getCell("N1").alignment = { horizontal: "center", vertical: "middle" };

  // Aplicar estilos de fondo y bordes a todas las celdas combinadas
  const headerCells = [
    "A1", "B1", "C1", "D1", "G1", "H1", "I1", "L1", "M1", "N1",
    "D2", "E2", "F2", "I2", "J2", "K2",
  ];
  headerCells.forEach((cell) => {
    worksheet.getCell(cell).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9EAF7" }, // Azul claro
    };
    worksheet.getCell(cell).font = { bold: true };
    worksheet.getCell(cell).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Agregar datos de las áreas
  areas.forEach((area, index) => {
    const rowIndex = index + 3; // Empieza después del encabezado
    worksheet.addRow([
      area.idArea, // ID de Área
      area.identificacionData.areaIluminada, // Nombre del Área
      area.identificacionData.descripcionSuperficie, // Descripción del Área Iluminada
      area.dimensionesData.largo, // Largo
      area.dimensionesData.ancho, // Ancho
      area.dimensionesData.altura, // Altura
      area.luminariasData.iluminacionLocalizada, // Iluminación Localizada
      area.luminariasData.potencia, // Potencia
      area.luminariasData.tipoLuminaria, // Tipo de Lámpara
      area.luminariasData.distribucion, // Distribución
      area.luminariasData.cantidad, // Cantidad de Lámparas
      area.dimensionesData.indiceArea, // Índice de Área
      calculateMinAreas(area.dimensionesData.indiceArea), // Mínimo de Zonas
      calculateMaxAreas(area.dimensionesData.indiceArea), // Máximo de Zonas
    ]);

    // Aplicar bordes y estilos a las celdas de datos
    worksheet.getRow(rowIndex).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Ajustar el ancho de columnas automáticamente
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });
};

// Funciones para calcular valores mínimos y máximos
const calculateMinAreas = (indiceArea: number): number => {
  if (indiceArea < 1) return 4;
  if (indiceArea < 2) return 9;
  if (indiceArea < 3) return 16;
  return 25;
};

const calculateMaxAreas = (indiceArea: number): number => {
  if (indiceArea < 1) return 6;
  if (indiceArea < 2) return 12;
  if (indiceArea < 3) return 20;
  return 30;
};

export default ResumenAreaExcel;