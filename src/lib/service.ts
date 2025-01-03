// src/lib/service.ts

export interface Servicio {
  id: number;
  nombre: string;
  norma: string;
  estado: string;
}

export async function getServicios(): Promise<Servicio[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, nombre: "Diagnóstico Norma 25", norma: "25", estado: "pendiente" },
        { id: 2, nombre: "Capacitación Norma 11", norma: "11", estado: "en progreso" },
        { id: 3, nombre: "Auditoría Norma 25", norma: "25", estado: "completado" },
      ]);
    }, 500);
  });
}

export async function getServicioById(id: number): Promise<Servicio | null> {
  const servicios = await getServicios();
  return servicios.find((servicio) => servicio.id === id) || null;
}
