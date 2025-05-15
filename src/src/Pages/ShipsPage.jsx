import ShipList from "../components/Ships/ShipList";
import ShipForm from "../components/Ships/ShipForm";
import { useState } from "react";

const ShipsPage = () => {
  const [editingShip, setEditingShip] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <ShipForm editingShip={editingShip} setEditingShip={setEditingShip} />
      <ShipList setEditingShip={setEditingShip} />
    </div>
  );
};

export default ShipsPage;
