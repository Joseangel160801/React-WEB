import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ nombre, precio, disponible }) {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    return (
        <div
            role="button"
            tabIndex={0}
            aria-pressed={mostrarDetalles}
            onClick={() => setMostrarDetalles(!mostrarDetalles)}
            onKeyDown={(e) => e.key === 'Enter' && setMostrarDetalles(!mostrarDetalles)}
            className={`p-4 border rounded shadow-md mb-4 cursor-pointer transition-all ${disponible ? 'bg-green-1000' : 'bg-red-100'
                }`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">{nombre}</h2>
                    <p className="text-gray-700">${precio}</p>
                </div>
                <span className="text-2xl">
                    {disponible ? '✅' : '❌'}
                </span>
            </div>

            {mostrarDetalles && (
                <div className="mt-2 text-sm text-gray-600">
                    Estado: {disponible ? 'Disponible' : 'Agotado'}
                </div>
            )}
        </div>
    );
}

ProductCard.propTypes = {
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    disponible: PropTypes.bool.isRequired,
};
