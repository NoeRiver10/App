import { Area } from '@/app/context/context25/areascontext';
const FormularioSeleccion: React.FC<{
    formData: {
      selectedArea: string;
      selectedPuesto: string;
    };
    updateField: (field: "selectedArea" | "selectedPuesto", value: string) => void;
    areas: Area[];
    puestosTrabajo: string[];
  }> = ({ formData, updateField, areas, puestosTrabajo }) => (
    <div className="flex flex-col space-y-4 mb-8">
      <select
        value={formData.selectedArea}
        onChange={(e) => updateField("selectedArea", e.target.value)}
        className="p-3 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Seleccione un Área
        </option>
        {areas.map((area) => (
          <option key={area.idArea} value={area.idArea}>
            Área {area.idArea} - {area.identificacionData.areaIluminada || area.nombreArea}
          </option>
        ))}
      </select>
      <select
        value={formData.selectedPuesto}
        onChange={(e) => updateField("selectedPuesto", e.target.value)}
        disabled={!formData.selectedArea}
        className="p-3 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Seleccione un Puesto
        </option>
        {puestosTrabajo.map((puesto, index) => (
          <option key={index} value={puesto}>
            {puesto}
          </option>
        ))}
      </select>
    </div>
  );
  
  export default FormularioSeleccion;
  