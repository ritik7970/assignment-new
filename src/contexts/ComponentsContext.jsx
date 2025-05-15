import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ComponentsContext = createContext();

export const useComponents = () => useContext(ComponentsContext);

const COMPONENTS_KEY = "components";

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(COMPONENTS_KEY);
    setComponents(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(COMPONENTS_KEY, JSON.stringify(components));
  }, [components]);

  const addComponent = (component) => {
    const newComponent = { ...component, id: uuidv4() };
    setComponents((prev) => [...prev, newComponent]);
  };

  const updateComponent = (updated) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const deleteComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, updateComponent, deleteComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};
