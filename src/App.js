import React, { useState, useEffect } from 'react'; // Import useEffect
import DiagramLegend from './components/DiagramLegend';

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
            const prompt = `Analiza los siguientes casos de uso y define una arquitectura completa de Diseño Orientado a Dominio (DDD).
            Identifica:
            - Contextos Delimitados (Bounded Contexts) con su propósito y responsabilidades
            - Lenguaje Ubicuo (Ubiquitous Language) para cada contexto (término y definición)
            - Agregados (Aggregates) con su Entidad Raíz (Root Entity), Entidades, Objetos de Valor (Value Objects) y Repositorios
            - Relaciones entre entidades dentro de cada agregado
            - Servicios de Dominio (Domain Services)
            - Servicios de Aplicación (Application Services)
            - Eventos de Dominio (Domain Events)
            - Mapas de Contexto (Context Maps) con patrones de integración entre bounded contexts:
              * Shared Kernel: kernel compartido entre contextos
              * Customer-Supplier: relación cliente-proveedor
              * Conformist: el contexto downstream se conforma al upstream
              * Anticorruption Layer: capa anticorrupción
              * Open Host Service: servicio de host abierto
              * Published Language: lenguaje publicado
              * Separate Ways: contextos completamente independientes
              * Partnership: asociación entre contextos
            - Explicación de cómo cada bounded context se relaciona con el dominio general

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
                    "domainOverview": {
                        "type": "OBJECT",
                        "properties": {
                            "name": { "type": "STRING" },
                            "description": { "type": "STRING" },
                            "purpose": { "type": "STRING" }
                        },
                        "propertyOrdering": ["name", "description", "purpose"]
                    },
                    "boundedContexts": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "name": { "type": "STRING" },
                                "description": { "type": "STRING" },
                                "responsibilities": { "type": "ARRAY", "items": { "type": "STRING" } },
                                "relationToDomain": { "type": "STRING" },
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
                                            "entities": { 
                                                "type": "ARRAY", 
                                                "items": {
                                                    "type": "OBJECT",
                                                    "properties": {
                                                        "name": { "type": "STRING" },
                                                        "attributes": { "type": "ARRAY", "items": { "type": "STRING" } }
                                                    },
                                                    "propertyOrdering": ["name", "attributes"]
                                                }
                                            },
                                            "valueObjects": { 
                                                "type": "ARRAY", 
                                                "items": {
                                                    "type": "OBJECT",
                                                    "properties": {
                                                        "name": { "type": "STRING" },
                                                        "properties": { "type": "ARRAY", "items": { "type": "STRING" } }
                                                    },
                                                    "propertyOrdering": ["name", "properties"]
                                                }
                                            },
                                            "repository": { "type": "STRING" },
                                            "description": { "type": "STRING" }
                                        },
                                        "propertyOrdering": ["name", "rootEntity", "entities", "valueObjects", "repository", "description"]
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
                            "propertyOrdering": ["name", "description", "responsibilities", "relationToDomain", "ubiquitousLanguage", "aggregates", "domainServices", "applicationServices", "domainEvents"]
                        }
                    },
                    "contextMaps": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "upstreamContext": { "type": "STRING" },
                                "downstreamContext": { "type": "STRING" },
                                "pattern": { 
                                    "type": "STRING",
                                    "enum": ["Shared Kernel", "Customer-Supplier", "Conformist", "Anticorruption Layer", "Open Host Service", "Published Language", "Separate Ways", "Partnership"]
                                },
                                "description": { "type": "STRING" }
                            },
                            "propertyOrdering": ["upstreamContext", "downstreamContext", "pattern", "description"]
                        }
                    }
                },
                "propertyOrdering": ["domainOverview", "boundedContexts", "contextMaps"]
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
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
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
                        Modelo del dominio
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

                        {/* Domain Overview */}
                        {dddArchitecture.domainOverview && (
                            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md border-2 border-indigo-200">
                                <h3 className="text-2xl font-bold text-indigo-800 mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Dominio General: {dddArchitecture.domainOverview.name}
                                </h3>
                                <p className="text-gray-800 mb-2 font-medium">{dddArchitecture.domainOverview.description}</p>
                                <p className="text-gray-700 italic">{dddArchitecture.domainOverview.purpose}</p>
                            </div>
                        )}

                        {/* Bounded Contexts */}
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

                                    {context.responsibilities && context.responsibilities.length > 0 && (
                                        <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                                            <h5 className="font-semibold text-blue-800 mb-2">Responsabilidades:</h5>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {context.responsibilities.map((resp, respIndex) => (
                                                    <li key={respIndex}>{resp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {context.relationToDomain && (
                                        <div className="mb-4 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                                            <h5 className="font-semibold text-indigo-800 mb-2">Relación con el Dominio General:</h5>
                                            <p className="text-gray-700">{context.relationToDomain}</p>
                                        </div>
                                    )}

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
                                                Agregados (Diagrama de Entidades):
                                            </h4>
                                            <DiagramLegend />
                                            <div className="space-y-4 mt-4">
                                                {context.aggregates.map((agg, aggIndex) => (
                                                    <div key={aggIndex} className="bg-white p-4 rounded-md border-2 border-purple-300 shadow-sm">
                                                        <div className="mb-3 pb-2 border-b-2 border-purple-200">
                                                            <p className="font-bold text-purple-900 text-lg">{agg.name}</p>
                                                            <p className="text-gray-600 text-sm italic mt-1">{agg.description}</p>
                                                        </div>
                                                        
                                                        {/* Root Entity */}
                                                        <div className="mb-3 bg-purple-100 p-3 rounded border-l-4 border-purple-500">
                                                            <p className="font-semibold text-purple-800 mb-1">
                                                                🔵 Entidad Raíz: <span className="text-purple-900">{agg.rootEntity}</span>
                                                            </p>
                                                        </div>

                                                        {/* Entities */}
                                                        {agg.entities && agg.entities.length > 0 && (
                                                            <div className="mb-3 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                                                                <p className="font-semibold text-blue-800 mb-2">📦 Entidades:</p>
                                                                <div className="space-y-2 ml-4">
                                                                    {agg.entities.map((entity, eIndex) => (
                                                                        <div key={eIndex} className="bg-white p-2 rounded border border-blue-200">
                                                                            <p className="font-medium text-blue-900">{entity.name || entity}</p>
                                                                            {entity.attributes && entity.attributes.length > 0 && (
                                                                                <ul className="text-sm text-gray-600 mt-1 ml-4 list-disc">
                                                                                    {entity.attributes.map((attr, aIndex) => (
                                                                                        <li key={aIndex}>{attr}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Value Objects */}
                                                        {agg.valueObjects && agg.valueObjects.length > 0 && (
                                                            <div className="mb-3 bg-green-50 p-3 rounded border-l-4 border-green-400">
                                                                <p className="font-semibold text-green-800 mb-2">💎 Objetos de Valor:</p>
                                                                <div className="space-y-2 ml-4">
                                                                    {agg.valueObjects.map((vo, vIndex) => (
                                                                        <div key={vIndex} className="bg-white p-2 rounded border border-green-200">
                                                                            <p className="font-medium text-green-900">{vo.name || vo}</p>
                                                                            {vo.properties && vo.properties.length > 0 && (
                                                                                <ul className="text-sm text-gray-600 mt-1 ml-4 list-disc">
                                                                                    {vo.properties.map((prop, pIndex) => (
                                                                                        <li key={pIndex}>{prop}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Repository */}
                                                        {agg.repository && (
                                                            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                                                                <p className="font-semibold text-orange-800">
                                                                    🗄️ Repositorio: <span className="text-orange-900">{agg.repository}</span>
                                                                </p>
                                                            </div>
                                                        )}
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

                        {/* Context Maps */}
                        {dddArchitecture.contextMaps && dddArchitecture.contextMaps.length > 0 && (
                            <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg shadow-md border-2 border-teal-200">
                                <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Mapas de Contexto (Context Maps)
                                </h3>
                                <p className="text-gray-700 mb-4 italic">
                                    Patrones de integración entre Bounded Contexts
                                </p>
                                
                                <div className="space-y-4">
                                    {dddArchitecture.contextMaps.map((map, mapIndex) => {
                                        // Define colors and icons for each pattern
                                        const patternStyles = {
                                            'Shared Kernel': { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-800', icon: '🤝' },
                                            'Customer-Supplier': { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800', icon: '👥' },
                                            'Conformist': { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-800', icon: '🙇' },
                                            'Anticorruption Layer': { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-800', icon: '🛡️' },
                                            'Open Host Service': { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-800', icon: '🌐' },
                                            'Published Language': { bg: 'bg-indigo-100', border: 'border-indigo-400', text: 'text-indigo-800', icon: '📝' },
                                            'Separate Ways': { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-800', icon: '↔️' },
                                            'Partnership': { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-pink-800', icon: '🤜🤛' }
                                        };
                                        
                                        const style = patternStyles[map.pattern] || patternStyles['Partnership'];
                                        
                                        return (
                                            <div key={mapIndex} className={`${style.bg} p-4 rounded-lg border-2 ${style.border} shadow-sm`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl">{style.icon}</span>
                                                        <div>
                                                            <p className={`font-bold ${style.text} text-lg`}>{map.pattern}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-center my-3 space-x-2">
                                                    <div className={`px-4 py-2 bg-white rounded-lg border-2 ${style.border} font-semibold ${style.text} shadow-sm`}>
                                                        {map.upstreamContext}
                                                    </div>
                                                    <span className="text-2xl font-bold text-gray-600">→</span>
                                                    <div className={`px-4 py-2 bg-white rounded-lg border-2 ${style.border} font-semibold ${style.text} shadow-sm`}>
                                                        {map.downstreamContext}
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                                                    {map.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Pattern Legend */}
                                <div className="mt-6 p-4 bg-white rounded-lg border border-teal-300">
                                    <h4 className="font-semibold text-teal-800 mb-3">Leyenda de Patrones:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div><span className="font-semibold">🤝 Shared Kernel:</span> Kernel compartido entre contextos</div>
                                        <div><span className="font-semibold">👥 Customer-Supplier:</span> Relación cliente-proveedor</div>
                                        <div><span className="font-semibold">🙇 Conformist:</span> Downstream se conforma al upstream</div>
                                        <div><span className="font-semibold">🛡️ Anticorruption Layer:</span> Capa anticorrupción</div>
                                        <div><span className="font-semibold">🌐 Open Host Service:</span> Servicio de host abierto</div>
                                        <div><span className="font-semibold">📝 Published Language:</span> Lenguaje publicado</div>
                                        <div><span className="font-semibold">↔️ Separate Ways:</span> Contextos independientes</div>
                                        <div><span className="font-semibold">🤜🤛 Partnership:</span> Asociación entre contextos</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
