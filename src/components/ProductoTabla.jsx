import React from 'react';
import { eliminarProducto } from '../services/api';
import { toast } from 'react-toastify';

export default function ProductoTabla({ productos, dispatch, setModal, setEditarProducto }) {
    const eliminar = async (id) => {
        if (confirm('¿Seguro que deseas eliminar este producto?')) {
            try {
                await eliminarProducto(id);
                dispatch({ type: 'delete', payload: id });
                toast.success('Producto eliminado');
            } catch {
                toast.error('Error al eliminar');
            }
        }
    };

    return (
        <table className="min-w-full mt-4 border">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Nombre</th>
                    <th className="border px-4 py-2">Precio</th>
                    <th className="border px-4 py-2">Cantidad</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map(p => (
                    <tr key={p.id}>
                        <td className="border px-4 py-2">{p.nombre}</td>
                        <td className="border px-4 py-2">${p.precio}</td>
                        <td className="border px-4 py-2">{p.cantidad}</td>
                        <td className="border px-4 py-2 space-x-2">
                            <button onClick={() => { setEditarProducto(p); setModal(true); }} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                            <button onClick={() => eliminar(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}