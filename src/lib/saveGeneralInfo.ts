import { db } from "@/lib/firebaseConfig";
import { Timestamp,collection, addDoc } from "firebase/firestore";

export const saveGeneralInfo = async (data: {
  idInforme: string;
  empresa: string;
  rfc: string;
  giro: string;
  representante: string;
  telefono: string;
  cargo: string;
  fechaMuestreo: Date;
  fechaReconocimiento: Date;
}) => {
  try {
    const docRef = await addDoc(collection(db, "informacion_general"), {
      ...data,
      fechaMuestreo: Timestamp.fromDate(data.fechaMuestreo), // Convierte a Timestamp
      fechaReconocimiento: Timestamp.fromDate(data.fechaReconocimiento), // Convierte a Timestamp
    });
    console.log("Documento guardado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar el documento:", error);
    throw error;
  }
};
