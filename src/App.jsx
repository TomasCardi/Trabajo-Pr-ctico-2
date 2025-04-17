import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEdit = () => {
    if (item.trim() === "") return;

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex].nombre = item;
      setItems(updatedItems);
      setEditIndex(null);
    } else {

      const existingIndex = items.findIndex((it) => it.nombre.toLowerCase() === item.toLowerCase());
      if (existingIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingIndex].cantidad += 1;
        setItems(updatedItems);
      } else {
        setItems([...items, { nombre: item, cantidad: 1 }]);
      }
    }

    setItem("");
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setItem(items[index].nombre);
    setEditIndex(index);
  };

  const aumentarCantidad = (index) => {
    const updatedItems = [...items];
    updatedItems[index].cantidad += 1;
    setItems(updatedItems);
  };

  const disminuirCantidad = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].cantidad > 1) {
      updatedItems[index].cantidad -= 1;
      setItems(updatedItems);
    } else {
      handleDelete(index);
    }
  };

  return (
    <div className="container">
      <h1>🛒 Lista de Compras</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Agregar ítem..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={handleAddOrEdit}>
          {editIndex !== null ? "Editar" : "Agregar"}
        </button>
      </div>
      <ul>
        {items.map((it, index) => (
          <li key={index}>
            <span>{it.nombre} ({it.cantidad})</span>
            <div>
              <button onClick={() => aumentarCantidad(index)}>➕</button>
              <button onClick={() => disminuirCantidad(index)}>➖</button>
              <button onClick={() => handleEdit(index)}>✏️</button>
              <button onClick={() => handleDelete(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;