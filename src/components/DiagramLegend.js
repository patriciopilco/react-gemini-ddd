import React from 'react';

/**
 * DiagramLegend component - Displays a legend for DDD diagram symbols
 */
const DiagramLegend = () => {
    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h5 className="font-semibold text-gray-800 mb-3">Leyenda del Diagrama:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                    <span className="text-xl">🔵</span>
                    <span><span className="font-semibold">Entidad Raíz:</span> Punto de entrada del agregado</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-xl">📦</span>
                    <span><span className="font-semibold">Entidades:</span> Objetos con identidad única</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-xl">💎</span>
                    <span><span className="font-semibold">Value Objects:</span> Objetos inmutables sin identidad</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-xl">🗄️</span>
                    <span><span className="font-semibold">Repositorio:</span> Persiste y recupera agregados</span>
                </div>
            </div>
        </div>
    );
};

export default DiagramLegend;
