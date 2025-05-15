import { createContext, useContext, useEffect, useState } from "react";

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ships")) || [];
    setShips(stored);
  }, []);

  const saveShips = (updated) => {
    setShips(updated);
    localStorage.setItem("ships", JSON.stringify(updated));
  };

  const addShip = (ship) => {
    const updated = [...ships, ship];
    saveShips(updated);
  };

  const updateShip = (id, updatedShip) => {
    const updated = ships.map((s) => (s.id === id ? updatedShip : s));
    saveShips(updated);
  };

  const deleteShip = (id) => {
    const updated = ships.filter((s) => s.id !== id);
    saveShips(updated);
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
