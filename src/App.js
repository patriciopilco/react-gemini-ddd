import React, { useState, useEffect } from 'react'; // Import useEffect

// Main App component
const App = () => {
    // State to store the user's input use cases
    const [useCases, setUseCases] = useState('');
    // State to store the generated DDD architecture
    const [dddArchitecture, setDddArchitecture] = useState(null);
    // State for loading indicator
    const [loading, setLoading] = useState(false);
    // State for error messages
    const [error, setError] = useState('');

    // useEffect to dynamically load Tailwind CSS and Inter font
    useEffect(() => {
        // Load Tailwind CSS CDN
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        tailwindScript.onload = () => {
            console.log('Tailwind CSS loaded.');
            // Add custom config if needed, e.g., for JIT mode
            // tailwindcss.config = { /* your config */ };
        };
        tailwindScript.onerror = (e) => console.error('Failed to load Tailwind CSS:', e);
        document.head.appendChild(tailwindScript);

        // Load Inter font via style tag
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body {
                font-family: 'Inter', sans-serif;
            }
        `;
        fontStyle.onerror = (e) => console.error('Failed to load Inter font styles:', e);
        document.head.appendChild(fontStyle);

        // Cleanup function for when the component unmounts
        return () => {
            document.head.removeChild(tailwindScript);
            document.head.removeChild(fontStyle);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    /**
     * Handles the click event to generate the DDD architecture.
     * Calls the Gemini API with the user's use cases.
     */
    const handleGenerateDdd = async () => {
        if (!useCases.trim()) {
            setError('Por favor, ingresa al menos un caso de uso.');
            return;
        }

        setLoading(true);
        setError('');
        setDddArchitecture(null); // Clear previous results

        try {
            // Prompt for the AI model
            const prompt = `Analiza los siguientes casos de uso y define una arquitectura de Diseño Orientado a Dominio (DDD).
            Identifica:
            - Contextos Delimitados (Bounded Contexts)
            - Lenguaje Ubicuo (Ubiquitous Language) para cada contexto (término y definición)
            - Agregados (Aggregates) con su Entidad Raíz (Root Entity), Entidades, y Objetos de Valor (Value Objects)
            - Servicios de Dominio (Domain Services)
            - Servicios de Aplicación (Application Services)
            - Eventos de Dominio (Domain Events)

            Asegúrate de que la salida sea un JSON válido siguiendo el esquema proporcionado.
            Casos de Uso:
            ${useCases}`;

            // Chat history for the Gemini API call
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            // Define the JSON schema for the AI's response
            const responseSchema = {
                type: "OBJECT",
                properties: {
                    "boundedContexts": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "name": { "type": "STRING" },
                                "description": { "type": "STRING" },
                                "ubiquitousLanguage": {
                                    "type": "ARRAY",
                                    "items": {
                                        "type": "OBJECT",
                                        "properties": {
                                            "term": { "type": "STRING" },
                                            "definition": { "type": "STRING" }
                                        },
                                        "propertyOrdering": ["term", "definition"]
                                    }
                                },
                                "aggregates": {
                                    "type": "ARRAY",
                                    "items": {
                                        "type": "OBJECT",
                                        "properties": {
                                            "name": { "type": "STRING" },
                                            "rootEntity": { "type": "STRING" },
                                            "entities": { "type": "ARRAY", "items": { "type": "STRING" } },
                                            "valueObjects": { "type": "ARRAY", "items": { "type": "STRING" } },
                                            "description": { "type": "STRING" }
                                        },
                                        "propertyOrdering": ["name", "rootEntity", "entities", "valueObjects", "description"]
                                    }
                                },
                                "domainServices": {
                                    "type": "ARRAY",
                                    "items": {
                                        "type": "OBJECT",
                                        "properties": {
                                            "name": { "type": "STRING" },
                                            "description": { "type": "STRING" }
                                        },
                                        "propertyOrdering": ["name", "description"]
                                    }
                                },
                                "applicationServices": {
                                    "type": "ARRAY",
                                    "items": {
                                        "type": "OBJECT",
                                        "properties": {
                                            "name": { "type": "STRING" },
                                            "description": { "type": "STRING" }
                                        },
                                        "propertyOrdering": ["name", "description"]
                                    }
                                },
                                "domainEvents": {
                                    "type": "ARRAY",
                                    "items": {
                                        "type": "OBJECT",
                                        "properties": {
                                            "name": { "type": "STRING" },
                                            "description": { "type": "STRING" }
                                        },
                                        "propertyOrdering": ["name", "description"]
                                    }
                                }
                            },
                            "propertyOrdering": ["name", "description", "ubiquitousLanguage", "aggregates", "domainServices", "applicationServices", "domainEvents"]
                        }
                    }
                },
                "propertyOrdering": ["boundedContexts"]
            };


            // Payload for the API request
            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema
                }
            };

            // API key (handled by Canvas environment)
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            // Make the fetch call to the Gemini API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Parse the JSON response
            const result = await response.json();

            // Check if the response contains valid content
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const jsonText = result.candidates[0].content.parts[0].text;
                try {
                    const parsedJson = JSON.parse(jsonText);
                    setDddArchitecture(parsedJson);
                } catch (jsonError) {
                    setError('Error al analizar la respuesta JSON de la IA. Inténtalo de nuevo.');
                    console.error('JSON parsing error:', jsonError, 'Raw JSON:', jsonText);
                }
            } else {
                setError('No se pudo generar la arquitectura DDD. Inténtalo de nuevo.');
                console.error('Unexpected API response structure:', result);
            }

        } catch (err) {
            setError('Error al comunicarse con la IA: ' + err.message);
            console.error('API call error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center font-sans">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                        DDD AI Assistant
                    </span>
                </h1>

                <div className="mb-6">
                    <label htmlFor="useCases" className="block text-lg font-semibold text-gray-700 mb-2">
                        Describe tus casos de uso o requisitos (en español):
                    </label>
                    <textarea
                        id="useCases"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 shadow-sm"
                        rows="10"
                        placeholder="Ejemplo:
                        - Un usuario puede registrarse en el sistema.
                        - Un cliente puede crear un nuevo pedido.
                        - El sistema debe procesar pagos con tarjeta de crédito.
                        - Un administrador puede gestionar productos."
                        value={useCases}
                        onChange={(e) => setUseCases(e.target.value)}
                        aria-label="Casos de uso para el análisis de DDD"
                    ></textarea>
                </div>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleGenerateDdd}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-teal-600 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={loading}
                        aria-live="polite"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generando...
                            </span>
                        ) : (
                            'Generar Arquitectura DDD'
                        )}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">¡Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {dddArchitecture && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Arquitectura DDD Sugerida
                        </h2>
                        {dddArchitecture.boundedContexts && dddArchitecture.boundedContexts.length > 0 ? (
                            dddArchitecture.boundedContexts.map((context, index) => (
                                <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md border border-blue-100">
                                    <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.5 3-9s-1.343-9-3-9m0 18v-8.032M12 12.768V6m-3 0h6" />
                                        </svg>
                                        Contexto Delimitado: {context.name}
                                    </h3>
                                    <p className="text-gray-700 mb-4">{context.description}</p>

                                    {context.ubiquitousLanguage && context.ubiquitousLanguage.length > 0 && (
                                        <div className="mb-4 bg-blue-50 p-4 rounded-lg">
                                            <h4 className="text-xl font-medium text-blue-600 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                Lenguaje Ubicuo:
                                            </h4>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {context.ubiquitousLanguage.map((lang, langIndex) => (
                                                    <li key={langIndex}>
                                                        <span className="font-semibold">{lang.term}:</span> {lang.definition}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {context.aggregates && context.aggregates.length > 0 && (
                                        <div className="mb-4 bg-purple-50 p-4 rounded-lg">
                                            <h4 className="text-xl font-medium text-purple-600 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm10 2H7v1h6V7zm0 3H7v1h6v-1z" clipRule="evenodd" />
                                                </svg>
                                                Agregados:
                                            </h4>
                                            <div className="space-y-3">
                                                {context.aggregates.map((agg, aggIndex) => (
                                                    <div key={aggIndex} className="bg-purple-100 p-3 rounded-md border border-purple-200">
                                                        <p className="font-semibold text-purple-800">Nombre: {agg.name}</p>
                                                        <p className="text-gray-700">Entidad Raíz: <span className="font-medium">{agg.rootEntity}</span></p>
                                                        {agg.entities && agg.entities.length > 0 && (
                                                            <p className="text-gray-700">Entidades: {agg.entities.join(', ')}</p>
                                                        )}
                                                        {agg.valueObjects && agg.valueObjects.length > 0 && (
                                                            <p className="text-gray-700">Objetos de Valor: {agg.valueObjects.join(', ')}</p>
                                                        )}
                                                        <p className="text-gray-600 text-sm italic">{agg.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {context.domainServices && context.domainServices.length > 0 && (
                                        <div className="mb-4 bg-green-50 p-4 rounded-lg">
                                            <h4 className="text-xl font-medium text-green-600 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zm0 4a1 1 0 000 2h7a1 1 0 100-2H3zm0 4a1 1 0 100 2h4a1 1 0 100-2H3z" clipRule="evenodd" />
                                                </svg>
                                                Servicios de Dominio:
                                            </h4>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {context.domainServices.map((service, serviceIndex) => (
                                                    <li key={serviceIndex}>
                                                        <span className="font-semibold">{service.name}:</span> {service.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {context.applicationServices && context.applicationServices.length > 0 && (
                                        <div className="mb-4 bg-yellow-50 p-4 rounded-lg">
                                            <h4 className="text-xl font-medium text-yellow-600 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2z" />
                                                    <path fillRule="evenodd" d="M4 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm12 0a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2z" clipRule="evenodd" />
                                                </svg>
                                                Servicios de Aplicación:
                                            </h4>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {context.applicationServices.map((service, serviceIndex) => (
                                                    <li key={serviceIndex}>
                                                        <span className="font-semibold">{service.name}:</span> {service.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {context.domainEvents && context.domainEvents.length > 0 && (
                                        <div className="mb-4 bg-red-50 p-4 rounded-lg">
                                            <h4 className="text-xl font-medium text-red-600 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-8a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                Eventos de Dominio:
                                            </h4>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {context.domainEvents.map((event, eventIndex) => (
                                                    <li key={eventIndex}>
                                                        <span className="font-semibold">{event.name}:</span> {event.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No se encontraron contextos delimitados.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
