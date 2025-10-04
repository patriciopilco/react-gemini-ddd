import React, { useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Colores para el diagrama C4 - Nivel de Contexto
const C4_COLORS = {
    system: '#1168bd',
    person: '#08427b',
    externalSystem: '#999999',
};

// Función para calcular el layout automático usando Dagre
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: node.width || 200, height: node.height || 100 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - (node.width || 200) / 2,
                y: nodeWithPosition.y - (node.height || 100) / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

const C4ContextDiagram = ({ data }) => {
    // Crear nodos y aristas desde los datos
    const initialNodes = useMemo(() => {
        if (!data || !data.contextMap) return [];

        const nodes = [];
        let nodeId = 1;

        // Agregar bounded contexts como nodos del sistema
        data.contextMap.boundedContexts?.forEach((context) => {
            nodes.push({
                id: `context-${nodeId}`,
                type: 'default',
                data: {
                    label: (
                        <div style={{ padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                {context.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#fff' }}>
                                [Bounded Context]
                            </div>
                            <div style={{ fontSize: '10px', marginTop: '5px', color: '#e0e0e0' }}>
                                {context.description}
                            </div>
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                width: 220,
                height: 120,
                style: {
                    background: C4_COLORS.system,
                    color: 'white',
                    border: '2px solid #0d4d8c',
                    borderRadius: '8px',
                    fontSize: '12px',
                    padding: 0,
                },
            });
            nodeId++;
        });

        // Agregar sistemas externos si existen
        data.contextMap.externalSystems?.forEach((system) => {
            nodes.push({
                id: `external-${nodeId}`,
                type: 'default',
                data: {
                    label: (
                        <div style={{ padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                {system.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#fff' }}>
                                [Sistema Externo]
                            </div>
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                width: 200,
                height: 100,
                style: {
                    background: C4_COLORS.externalSystem,
                    color: 'white',
                    border: '2px solid #666',
                    borderRadius: '8px',
                    fontSize: '12px',
                },
            });
            nodeId++;
        });

        return nodes;
    }, [data]);

    const initialEdges = useMemo(() => {
        if (!data || !data.contextMap || !data.contextMap.relationships) return [];

        return data.contextMap.relationships.map((rel, index) => ({
            id: `edge-${index}`,
            source: `context-${rel.from + 1}`,
            target: `context-${rel.to + 1}`,
            label: rel.pattern || rel.type,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#1168bd', strokeWidth: 2 },
            labelStyle: { fill: '#1168bd', fontWeight: 600, fontSize: 11 },
            labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#1168bd',
            },
        }));
    }, [data]);

    // Aplicar layout automático
    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
        () => getLayoutedElements(initialNodes, initialEdges),
        [initialNodes, initialEdges]
    );

    const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
    const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

    if (!data || !data.contextMap) {
        return (
            <div className="p-4 text-center text-gray-500">
                No hay datos de contexto disponibles para mostrar el diagrama C4.
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '600px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                attributionPosition="bottom-left"
            >
                <Background color="#f0f0f0" gap={16} />
                <Controls />
                <MiniMap
                    nodeColor={(node) => {
                        if (node.id.startsWith('context-')) return C4_COLORS.system;
                        if (node.id.startsWith('external-')) return C4_COLORS.externalSystem;
                        return C4_COLORS.person;
                    }}
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
            </ReactFlow>
        </div>
    );
};

export default C4ContextDiagram;
