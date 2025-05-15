import { useState } from "react";
import ComponentForm from "../Components/component/ComponentForm";
import ComponentList from "../Components/component/ComponentList";

const ComponentsPage = () => {
  const [editingComponent, setEditingComponent] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <ComponentForm
        editingComponent={editingComponent}
        setEditingComponent={setEditingComponent}
      />
      <ComponentList setEditingComponent={setEditingComponent} />
    </div>
  );
};

export default ComponentsPage;
