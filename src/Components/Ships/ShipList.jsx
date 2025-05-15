import { useShips } from "../../contexts/ShipsContext";
import { Link } from "react-router-dom"; // ✅ import Link

const ShipList = ({ setEditingShip }) => {
  const { ships, deleteShip } = useShips();

  if (ships.length === 0) {
    return <p className="text-gray-600">No ships found.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Ships</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">IMO</th>
            <th className="p-2">Flag</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr key={ship.id} className="border-t">
              <td className="p-2">
                <Link
                  to={`/ships/${ship.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {ship.name}
                </Link>
              </td>
              <td className="p-2">{ship.imo}</td>
              <td className="p-2">{ship.flag}</td>
              <td className="p-2">{ship.status}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => setEditingShip(ship)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteShip(ship.id)}
                  className="text-red-600 hover:underline"
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

export default ShipList;
