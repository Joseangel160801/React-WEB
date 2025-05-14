import React, { useEffect, useReducer, useState } from 'react';
import ProductoTabla from "./components/ProductoTabla";
import ProductoForm from "./components/ProductoForms";
import ProductCard from './components/ProductCard';
import PropTypes from 'prop-types';
import { obtenerProductos } from './services/api';
import { toast } from 'react-toastify';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'set': return action.payload;
    case 'add': return [...state, action.payload];
    case 'update': return state.map(p => p.id === action.payload.id ? action.payload : p);
    case 'delete': return state.filter(p => p.id !== action.payload);
    default: return state;
  }
}

export default function App() {
  const [productos, dispatch] = useReducer(reducer, initialState);
  const [modal, setModal] = useState(false);
  const [editarProducto, setEditarProducto] = useState(null);

  /* este HOOK lo que hace es que trata de guardar el producto en la api y si no es posible guardarlo muestra un error de no guardado. */
  useEffect(() => {
    obtenerProductos()
      .then(data => dispatch({ type: 'set', payload: data }))
      .catch(() => toast.error('Error al cargar productos'));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD de Productos</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
        setEditarProducto(null);
        setModal(true);
      }}>Agregar Producto</button>


      {productos.map(p => (
        <ProductCard
          key={p.id}
          nombre={p.nombre}
          precio={p.precio}
          disponible={p.cantidad > 0}
        />
      ))}

      <ProductoTabla productos={productos} dispatch={dispatch} setModal={setModal} setEditarProducto={setEditarProducto} />

      {modal && <ProductoForm close={() => setModal(false)} producto={editarProducto} dispatch={dispatch} />}
    </div>
  );
}