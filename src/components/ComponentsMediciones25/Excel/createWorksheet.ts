import ExcelJS from "exceljs";
import { applyHeaderStyles, applySubheaderStyles } from "./styles";
import { ExcelRow } from "@/app/types/areasTypes";

const createWorksheet = (
  workbook: ExcelJS.Workbook,
  sheetName: string,
  headers: string[],
  mainHeaders: string[],
  subHeaders: string[],
  data: ExcelRow[]
) => {
  const worksheet = workbook.addWorksheet(sheetName);

  // Encabezados generales
  headers.forEach((header, index) => {
    const cell = worksheet.getCell(1, index + 1);
    cell.value = header;
    applyHeaderStyles(cell);
  });

  // Encabezados principales y subencabezados
  mainHeaders.forEach((header, index) => {
    const startCol = headers.length + index * subHeaders.length + 1;
    const endCol = startCol + subHeaders.length - 1;
    worksheet.mergeCells(1, startCol, 1, endCol);
    const cell = worksheet.getCell(1, startCol);
    cell.value = header;
    applyHeaderStyles(cell);

    subHeaders.forEach((subHeader, subIndex) => {
      const subCell = worksheet.getCell(2, startCol + subIndex);
      subCell.value = subHeader;
      applySubheaderStyles(subCell);
    });
  });

  // Agregar datos
  data.forEach((row) => worksheet.addRow(row));

  // Ajustar ancho de columnas
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      if (cell.value) {
        maxLength = Math.max(maxLength, cell.value.toString().length);
      }
    });
    column.width = maxLength + 2;
  });

  return worksheet;
};

export default createWorksheet;
