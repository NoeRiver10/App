import ExcelJS from "exceljs";

interface PuestoData {
  nombrePuesto: string;
  descripcionActividades?: string;
  numTrabajadores?: number;
  tareaVisual?: string;
  nivelSeleccionado?: number;
  idHorarios?: string;
}

interface Area {
    idArea: number; // Cambiado a number
    puestosData: PuestoData[];
  }
  

const ResumenPuestosExcel = (workbook: ExcelJS.Workbook, areas: Area[]) => {
  const sheetName = "Resumen de Puestos";
  const worksheet = workbook.addWorksheet(sheetName);

  // Encabezados principales
  const headers = [
    "ID DE ÁREA",
    "PUESTO (S) DE TRABAJO",
    "DESCRIPCIÓN GENERAL DE LAS ACTIVIDADES DEL PUESTO",
    "NO. DE TRAB. EXPUESTOS",
    "TAREA VISUAL",
    "NMI (Lx)",
    "ID (horario's)",
  ];

  // Aplicar encabezados principales con colores y estilos
  headers.forEach((header, index) => {
    const startRow = 1; // Fila inicial para el diseño específico
    const endRow = 2; // Fila final para combinar
    const colIndex = index + 1;

    // Combinar celdas para encabezados
    worksheet.mergeCells(startRow, colIndex, endRow, colIndex);

    const cell = worksheet.getCell(startRow, colIndex);
    cell.value = header;

    // Aplicar estilos al encabezado
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.font = { bold: true, color: { argb: "000000" } }; // Texto negro
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9EAD3" }, // Color de fondo: verde claro
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Agregar datos
  areas.forEach((area) => {
    area.puestosData.forEach((puesto) => {
      const row = [
        area.idArea, // ID DE ÁREA
        puesto.nombrePuesto, // PUESTO(S) DE TRABAJO
        puesto.descripcionActividades || "N/A", // DESCRIPCIÓN GENERAL DE LAS ACTIVIDADES DEL PUESTO
        puesto.numTrabajadores || "N/A", // NO. DE TRAB. EXPUESTOS
        puesto.tareaVisual || "N/A", // TAREA VISUAL
        puesto.nivelSeleccionado || "N/A", // NMI (Lx)
        puesto.idHorarios || "N/A", // ID (horario's)
      ];

      worksheet.addRow(row);
    });
  });

  // Ajustar ancho de columnas automáticamente
  worksheet.columns.forEach((column) => {
    column.width = 25; // Ancho estándar para todas las columnas
  });

  return worksheet;
};

export default ResumenPuestosExcel;
