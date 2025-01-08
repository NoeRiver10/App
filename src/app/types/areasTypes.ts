export interface IdentificacionData {
    idArea: string;
    areaIluminada: string;
    descripcionSuperficie: string;
  }
  
  export interface DimensionesData {
    altura: string;
    largo: string;
    ancho: string;
    indiceArea: number;
  }
  
  export interface LuminariasData {
    tipoLuminaria: string;
    potencia: number;
    distribucion: string;
    iluminacionLocalizada: string;
    cantidad: number;
  }
  
  export interface PercepcionData {
    nombreTrabajador: string;
    descripcion: string;
    puesto: string;
  }
  
  export interface MedicionesData {
    hora: string;
    trabajoE1: string;
    trabajoE2: string;
    paredesE1: string | 'N/A';
    paredesE2: string | 'N/A';
  }
  
  export interface Punto {
    numeroPunto: number;
    identificacion: string;
    departamento: string;
    planoTrabajo: string;
    nivelIluminacion: number | '';
    tipoIluminacion: string;
    mediciones: MedicionesData[];
  }
  
  export interface PuestoData {
    indice: number;
    nombrePuesto: string;
    numTrabajadores: number;
    descripcionActividades: string;
    nivelSeleccionado?: number | string;
    puntos: Punto[];
  }
  
  export interface Area {
    idArea: number;
    nombreArea: string;
    identificacionData: IdentificacionData;
    dimensionesData: DimensionesData;
    luminariasData: LuminariasData;
    percepcionData: PercepcionData;
    puestosData: PuestoData[];
  }
  