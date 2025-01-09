import ExcelJS from "exceljs";

export const applyHeaderStyles = (cell: ExcelJS.Cell) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "000000" },
  };
  cell.font = { color: { argb: "FFFFFF" }, bold: true };
  cell.alignment = { horizontal: "center", vertical: "middle" };
};

export const applySubheaderStyles = (cell: ExcelJS.Cell) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D9EAD3" },
  };
  cell.font = { bold: true };
  cell.alignment = { horizontal: "center", vertical: "middle" };
};
