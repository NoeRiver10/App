// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase de tu aplicación
const firebaseConfig = {
  apiKey: "AIzaSyDPhb048_wJxYazu2XjMUjfymNr1PuCOkY",
  authDomain: "lictusapp.firebaseapp.com",
  projectId: "lictusapp",
  storageBucket: "lictusapp.appspot.com", // Corregido
  messagingSenderId: "107987082276",
  appId: "1:107987082276:web:fb505f0bd22a5269c9ccb1",
  measurementId: "G-WDF6RPM28P", // Esto es opcional
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios necesarios (en este caso, Auth)
export const auth = getAuth(app);

auth.languageCode = "es";