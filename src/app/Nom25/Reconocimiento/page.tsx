"use client";

import { useState, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import IdentificacionArea from "@/components/ComponentsReconocimiento25/IdentificacionArea";
import DimensionesArea from "@/components/ComponentsReconocimiento25/DimensionesArea";
import Luminarias from "@/components/ComponentsReconocimiento25/Luminarias";
import Percepcion from "@/components/ComponentsReconocimiento25/Percepcion";
import Puestos from "@/components/ComponentsReconocimiento25/Puestos";
import ResumenAreas from "@/components/ComponentsReconocimiento25/ResumenAreas";
import { useAreas, Area } from "@/app/context/context25/areascontext"; // Importar el tipo Area

export default function ReconocimientoPage() {
  const router = useRouter();
  const { areas, setAreas } = useAreas();
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [showResumen, setShowResumen] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // Agregar una nueva área
  const handleAgregarArea = () => {
    const nuevaAreaId = areas.length + 1;
    const nuevaArea: Area = {
      idArea: nuevaAreaId,
      nombreArea: `Área ${nuevaAreaId}`,
      identificacionData: {
        idArea: `${nuevaAreaId}`,
        areaIluminada: "",
        descripcionSuperficie: "",
      },
      dimensionesData: {
        altura: "",
        largo: "",
        ancho: "",
        indiceArea: 0,
      },
      luminariasData: {
        tipoLuminaria: "",
        potencia: 0,
        distribucion: "LINEAL",
        iluminacionLocalizada: "SÍ",
        cantidad: 0,
      },
      percepcionData: {
        nombreTrabajador: "",
        descripcion: "",
        puesto: "",
      },
      puestosData: [
        {
          indice: 1,
          nombrePuesto: "",
          numTrabajadores: 0,
          descripcionActividades: "",
          nivelSeleccionado: undefined,
          puntos: [],
        },
      ],
    };

    setAreas((prevAreas) => [...prevAreas, nuevaArea]);
    setCurrentAreaIndex(areas.length);
    setMensaje("Área agregada con éxito");
  };

  // Eliminar un área específica
  const handleEliminarArea = (index: number) => {
    if (areas.length > 1) {
      setAreas((prevAreas) => prevAreas.filter((_, i) => i !== index));
      setCurrentAreaIndex(0);
      setMensaje("Área eliminada con éxito");
    }
  };

  // Actualizar datos de un área específica
  const actualizarArea = <K extends keyof Area>(
    index: number,
    key: K,
    data: SetStateAction<Area[K]>
  ) => {
    setAreas((prevAreas) => {
      const newAreas = [...prevAreas];
      const currentValue = newAreas[index][key];
  
      newAreas[index] = {
        ...newAreas[index],
        [key]:
          typeof data === "function"
            ? (data as (prevValue: Area[K]) => Area[K])(currentValue)
            : data,
      };
  
      return newAreas;
    });
  };
  
  // Cambiar el área seleccionada
  const handleSelectArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAreaIndex(Number(event.target.value));
  };

  // Guardar los datos actuales
  const handleGuardar = () => {
    console.log(areas);
    setMensaje("Datos guardados con éxito");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
        Reconocimiento
      </h1>
      {showResumen ? (
        <>
          <ResumenAreas areas={areas} />
          <button
            type="button"
            onClick={() => setShowResumen(false)}
            className="bg-yellow-600 text-white p-3 rounded-md mt-4"
          >
            Volver a la Edición de Áreas
          </button>
        </>
      ) : (
        <>
          {areas.length > 0 && (
            <>
              <div className="mb-8">
                <label
                  htmlFor="selectArea"
                  className="block text-lg font-semibold mb-2"
                >
                  Selecciona un Área:
                </label>
                <select
                  id="selectArea"
                  value={currentAreaIndex}
                  onChange={handleSelectArea}
                  className="w-full p-3 border border-gray-300 rounded-md mb-4"
                >
                  {areas.map((area, index) => (
                    <option key={area.idArea} value={index}>
                      {area.nombreArea} (
                      {area.identificacionData.areaIluminada || "Sin Nombre"})
                    </option>
                  ))}
                </select>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  {areas[currentAreaIndex].nombreArea}
                </h2>
                <IdentificacionArea
                  data={areas[currentAreaIndex].identificacionData}
                  setDataAction={(data) =>
                    actualizarArea(currentAreaIndex, "identificacionData", data)
                  }
                />
                <DimensionesArea
                data={areas[currentAreaIndex].dimensionesData}
                setDataAction={(data) =>
                  actualizarArea(currentAreaIndex, "dimensionesData", data)
                }
              />
                <Luminarias
                  data={areas[currentAreaIndex].luminariasData}
                  setData={(data) =>
                    actualizarArea(currentAreaIndex, "luminariasData", data)
                  }
                />
                <Percepcion
                  data={areas[currentAreaIndex].percepcionData}
                  setData={(data) =>
                    actualizarArea(currentAreaIndex, "percepcionData", data)
                  }
                />
                <Puestos
                  puestos={areas[currentAreaIndex].puestosData}
                  setPuestosAction={(data) =>
                    actualizarArea(currentAreaIndex, "puestosData", data)
                  }
                />
              </div>
            </>
          )}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleAgregarArea}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg transition transform hover:scale-105"
          >
            Agregar Área
          </button>
          <button
            type="button"
            onClick={handleGuardar}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition transform hover:scale-105"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => router.push("/Nom25/Mediciones")}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 hover:shadow-lg transition transform hover:scale-105"
          >
            Ir a Mediciones
          </button>
          <button
            type="button"
            onClick={() => setShowResumen(true)}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 hover:shadow-lg transition transform hover:scale-105"
          >
            Ir al Resumen de Áreas
          </button>
          {areas.length > 1 && (
            <button
              type="button"
              onClick={() => handleEliminarArea(currentAreaIndex)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition transform hover:scale-105"
            >
              Eliminar Área
            </button>
          )}
          <button
          type="button"
          onClick={() => router.push("/Nom25/InfoEmpresa")}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg transition transform hover:scale-105"
        >
          Ir a Información General
        </button>
        </div>          
        </>
      )}
      {mensaje && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          {mensaje}
        </div>
      )}
    </div>
  );
}
