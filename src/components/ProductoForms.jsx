
import React from 'react';
import { useForm } from 'react-hook-form';
import { crearProducto, actualizarProducto } from '../services/api';
import { toast } from 'react-toastify';

export default function ProductoForm({ close, producto, dispatch }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: producto || { nombre: '', precio: '', cantidad: '' }
    });

    const onSubmit = async data => {
        try {
            if (producto) {
                const updated = await actualizarProducto(producto.id, data);
                dispatch({ type: 'update', payload: updated });
                toast.success('Producto actualizado');
            } else {
                const nuevo = await crearProducto(data);
                dispatch({ type: 'add', payload: nuevo });
                toast.success('Producto creado');
            }
            close();
        } catch (err) {
            console.error('error', err)
            toast.error('Error al guardar');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96">
                <h2 className="text-xl font-bold mb-4">{producto ? 'Editar' : 'Agregar'} Producto</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('nombre', { required: true })} placeholder="Nombre" className="w-full mb-2 p-2 border rounded" />
                    {errors.nombre && <p className="text-red-500">Nombre es obligatorio</p>}

                    <input type="number" {...register('precio', { required: true, min: 1 })} placeholder="Precio" className="w-full mb-2 p-2 border rounded" />
                    {errors.precio && <p className="text-red-500">Precio debe ser mayor que 0</p>}

                    <input type="number" {...register('cantidad', { required: true, min: 0 })} placeholder="Cantidad" className="w-full mb-2 p-2 border rounded" />
                    {errors.cantidad && <p className="text-red-500">Cantidad no puede ser negativa</p>}

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={close} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}