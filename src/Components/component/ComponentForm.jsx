import { useState, useEffect } from "react";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

const ComponentForm = ({ editingComponent, setEditingComponent }) => {
  const { addComponent, updateComponent } = useComponents();
  const { ships } = useShips();

  const [formData, setFormData] = useState({
    shipId: "",
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });

  useEffect(() => {
    if (editingComponent) {
      setFormData(editingComponent);
    } else {
      setFormData({
        shipId: "",
        name: "",
        serialNumber: "",
        installDate: "",
        lastMaintenanceDate: "",
      });
    }
  }, [editingComponent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingComponent) {
      updateComponent(formData);
      setEditingComponent(null);
    } else {
      addComponent(formData);
    }

    setFormData({
      shipId: "",
      name: "",
      serialNumber: "",
      installDate: "",
      lastMaintenanceDate: "",
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">
        {editingComponent ? "Edit Component" : "Add Component"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Ship</label>
          <select
            name="shipId"
            value={formData.shipId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Ship</option>
            {ships.map((ship) => (
              <option key={ship.id} value={ship.id}>
                {ship.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Component Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Install Date</label>
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Last Maintenance Date</label>
          <input
            type="date"
            name="lastMaintenanceDate"
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingComponent ? "Update" : "Add"}
          </button>
          {editingComponent && (
            <button
              type="button"
              onClick={() => setEditingComponent(null)}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ComponentForm;
