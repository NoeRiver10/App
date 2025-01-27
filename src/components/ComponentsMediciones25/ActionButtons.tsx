import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ActionButtons: React.FC<{
  onGuardar: () => void;
  onAgregarPunto: () => void;
  onBorrarDatos: () => void;
  navigateToPoint: (direction: "next" | "previous") => void;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onIrReconocimiento: () => void;
  onShowResumen: () => void;
}> = ({
  onGuardar,
  onAgregarPunto,
  onBorrarDatos,
  navigateToPoint,
  canNavigateNext,
  canNavigatePrevious,
  onIrReconocimiento,
  onShowResumen,
}) => (
  <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-4">
    <button
      onClick={() => navigateToPoint("previous")}
      disabled={!canNavigatePrevious}
      className={`flex items-center justify-center ${
        canNavigatePrevious
          ? "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      } px-6 py-3 rounded-lg shadow-md text-sm`}
    >
      <FaArrowLeft className="text-xl" />
    </button>
    <button
      onClick={() => navigateToPoint("next")}
      disabled={!canNavigateNext}
      className={`flex items-center justify-center ${
        canNavigateNext
          ? "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      } px-6 py-3 rounded-lg shadow-md text-sm`}
    >
      <FaArrowRight className="text-xl" />
    </button>
    <button
      onClick={onGuardar}
      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg text-sm"
    >
      Guardar
    </button>
    <button
      onClick={onAgregarPunto}
      className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 hover:shadow-lg text-sm"
    >
      Agregar Punto
    </button>
    <button
      onClick={onShowResumen}
      className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-800 hover:shadow-lg text-sm"
    >
      Ir a Resumen
    </button>
    <button
      onClick={onIrReconocimiento}
      className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-orange-600 hover:to-orange-800 hover:shadow-lg text-sm"
    >
      Ir a Reconocimiento
    </button>
    <button
      onClick={onBorrarDatos}
      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 hover:shadow-lg text-sm"
    >
      Borrar Datos
    </button>
  </div>
);

export default ActionButtons;
