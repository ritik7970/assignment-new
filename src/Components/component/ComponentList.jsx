import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

const ComponentList = ({ setEditingComponent, selectedShipId }) => {
  const { components, deleteComponent } = useComponents();
  const { ships } = useShips();

  const filtered = selectedShipId
    ? components.filter((c) => c.shipId === selectedShipId)
    : components;

  const getShipName = (id) => ships.find((s) => s.id === id)?.name || "Unknown";

  if (filtered.length === 0) {
    return <p className="text-gray-600">No components found.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Serial #</th>
            <th className="p-2">Ship</th>
            <th className="p-2">Installed</th>
            <th className="p-2">Last Maint.</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((component) => (
            <tr key={component.id} className="border-t">
              <td className="p-2">{component.name}</td>
              <td className="p-2">{component.serialNumber}</td>
              <td className="p-2">{getShipName(component.shipId)}</td>
              <td className="p-2">{component.installDate}</td>
              <td className="p-2">{component.lastMaintenanceDate}</td>
              <td className="p-2 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setEditingComponent(component)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteComponent(component.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentList;
