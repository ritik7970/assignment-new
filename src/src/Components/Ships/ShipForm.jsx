import { useState, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";
import { v4 as uuidv4 } from "uuid";

const ShipForm = ({ editingShip, setEditingShip }) => {
  const { addShip, updateShip } = useShips();

  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (editingShip) {
      setForm(editingShip);
    }
  }, [editingShip]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingShip) {
      updateShip(editingShip.id, form);
      setEditingShip(null);
    } else {
      addShip({ ...form, id: uuidv4() });
    }
    setForm({ name: "", imo: "", flag: "", status: "Active" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-bold">{editingShip ? "Edit Ship" : "Add New Ship"}</h2>
      <input
        name="name"
        placeholder="Ship Name"
        value={form.name}
        onChange={handleChange}
        required
        className="input w-full p-2 border rounded"
      />
      <input
        name="imo"
        placeholder="IMO Number"
        value={form.imo}
        onChange={handleChange}
        required
        className="input w-full p-2 border rounded"
      />
      <input
        name="flag"
        placeholder="Flag"
        value={form.flag}
        onChange={handleChange}
        required
        className="input w-full p-2 border rounded"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input w-full p-2 border rounded"
      >
        <option>Active</option>
        <option>Under Maintenance</option>
        <option>Retired</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {editingShip ? "Update" : "Add Ship"}
      </button>
    </form>
  );
};

export default ShipForm;
