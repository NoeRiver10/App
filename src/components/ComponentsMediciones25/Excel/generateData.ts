import { Area, ExcelRow } from "@/app/types/areasTypes";

export const prepareGeneralData = (areas: Area[]): ExcelRow[] => {
  const rows: ExcelRow[] = [];

  areas.forEach((area) => {
    area.puestosData.forEach((puesto) => {
      puesto.puntos.forEach((punto, puntoIndex) => {
        const row: ExcelRow = [
          puntoIndex + 1, // Número de medición
          "00-ene-00", // Fecha (placeholder)
          punto.departamento,
          area.identificacionData?.areaIluminada || area.nombreArea,
          puesto.nombrePuesto,
          punto.identificacion,
          punto.planoTrabajo,
          punto.nivelIluminacion?.toString() || "",
          punto.tipoIluminacion || "",
          "N/A", // Observaciones
          "N/A", // Rango
        ];

        punto.mediciones.forEach((medicion) => {
          row.push(
            medicion.hora,
            medicion.trabajoE1,
            medicion.trabajoE2,
            medicion.paredesE1,
            medicion.paredesE2
          );
        });

        rows.push(row);
      });
    });
  });

  return rows;
};

export const prepareSummaryData = (areas: Area[]): ExcelRow[] => {
  return areas.map((area) => [
    area.nombreArea,
    area.puestosData.length,
    area.puestosData.flatMap((puesto) => puesto.puntos).length,
  ]);
};
