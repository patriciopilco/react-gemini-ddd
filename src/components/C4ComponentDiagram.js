import React, { useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Colores para el diagrama de componentes
const COMPONENT_COLORS = {
    component: '#4a5568',
    interface: '#805ad5',
    database: '#dd6b20',
    external: '#718096',
};

const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, ranksep: 120, nodesep: 80 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { 
            width: node.width || 200, 
            height: node.height || 100 
        });
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

const C4ComponentDiagram = ({ data }) => {
    const initialNodes = useMemo(() => {
        if (!data || !data.components) return [];

        const nodes = [];

        data.components.forEach((component, index) => {
            const nodeType = component.type?.toLowerCase() || 'component';
            let bgColor = COMPONENT_COLORS.component;
            let borderColor = '#2d3748';

            if (nodeType.includes('interface') || nodeType.includes('api')) {
                bgColor = COMPONENT_COLORS.interface;
                borderColor = '#6b46c1';
            } else if (nodeType.includes('database') || nodeType.includes('repository')) {
                bgColor = COMPONENT_COLORS.database;
                borderColor = '#c05621';
            } else if (nodeType.includes('external') || nodeType.includes('externo')) {
                bgColor = COMPONENT_COLORS.external;
                borderColor = '#4a5568';
            }

            nodes.push({
                id: `component-${index + 1}`,
                type: 'default',
                data: {
                    label: (
                        <div style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                {component.name}
                            </div>
                            <div style={{ fontSize: '10px', color: '#e0e0e0', marginBottom: '6px' }}>
                                [{component.type}]
                            </div>
                            {component.description && (
                                <div style={{ fontSize: '9px', color: '#f0f0f0', marginTop: '4px' }}>
                                    {component.description}
                                </div>
                            )}
                            {component.responsibilities && component.responsibilities.length > 0 && (
                                <div style={{ 
                                    fontSize: '9px', 
                                    color: '#f7fafc', 
                                    marginTop: '6px',
                                    textAlign: 'left',
                                    borderTop: '1px solid rgba(255,255,255,0.2)',
                                    paddingTop: '4px'
                                }}>
                                    <strong>Responsabilidades:</strong>
                                    <ul style={{ margin: '2px 0', paddingLeft: '15px' }}>
                                        {component.responsibilities.slice(0, 2).map((resp, i) => (
                                            <li key={i}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                width: 240,
                height: component.responsibilities ? 160 : 100,
                style: {
                    background: bgColor,
                    color: 'white',
                    border: `2px solid ${borderColor}`,
                    borderRadius: '8px',
                    fontSize: '11px',
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
        });

        return nodes;
    }, [data]);

    const initialEdges = useMemo(() => {
        if (!data || !data.components) return [];

        const edges = [];
        let edgeId = 1;

        data.components.forEach((component, index) => {
            // Crear edges basados en dependencias
            if (component.dependencies && Array.isArray(component.dependencies)) {
                component.dependencies.forEach((dep) => {
                    // Buscar el índice del componente dependiente
                    const targetIndex = data.components.findIndex(
                        c => c.name === dep || c.name.includes(dep) || dep.includes(c.name)
                    );

                    if (targetIndex !== -1 && targetIndex !== index) {
                        edges.push({
                            id: `edge-${edgeId}`,
                            source: `component-${index + 1}`,
                            target: `component-${targetIndex + 1}`,
                            label: 'usa',
                            type: 'smoothstep',
                            animated: true,
                            style: { stroke: '#805ad5', strokeWidth: 2 },
                            labelStyle: { fill: '#805ad5', fontWeight: 600, fontSize: 10 },
                            labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                color: '#805ad5',
                            },
                        });
                        edgeId++;
                    }
                });
            }

            // Crear edges basados en interacciones
            if (component.interactions && Array.isArray(component.interactions)) {
                component.interactions.forEach((interaction) => {
                    const targetIndex = data.components.findIndex(
                        c => c.name === interaction || c.name.includes(interaction)
                    );

                    if (targetIndex !== -1 && targetIndex !== index) {
                        edges.push({
                            id: `edge-${edgeId}`,
                            source: `component-${index + 1}`,
                            target: `component-${targetIndex + 1}`,
                            label: 'interactúa',
                            type: 'smoothstep',
                            style: { stroke: '#4299e1', strokeWidth: 2, strokeDasharray: '5,5' },
                            labelStyle: { fill: '#4299e1', fontWeight: 600, fontSize: 10 },
                            labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                color: '#4299e1',
                            },
                        });
                        edgeId++;
                    }
                });
            }
        });

        return edges;
    }, [data]);

    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
        () => getLayoutedElements(initialNodes, initialEdges, 'TB'),
        [initialNodes, initialEdges]
    );

    const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
    const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

    if (!data || !data.components || data.components.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No hay datos de componentes disponibles para mostrar el diagrama C4.
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '800px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                attributionPosition="bottom-left"
            >
                <Background color="#f8f9fa" gap={16} />
                <Controls />
                <MiniMap
                    nodeColor={(node) => {
                        const component = data.components[parseInt(node.id.split('-')[1]) - 1];
                        if (!component) return COMPONENT_COLORS.component;
                        
                        const type = component.type?.toLowerCase() || '';
                        if (type.includes('interface') || type.includes('api')) {
                            return COMPONENT_COLORS.interface;
                        } else if (type.includes('database') || type.includes('repository')) {
                            return COMPONENT_COLORS.database;
                        } else if (type.includes('external') || type.includes('externo')) {
                            return COMPONENT_COLORS.external;
                        }
                        return COMPONENT_COLORS.component;
                    }}
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
            </ReactFlow>
        </div>
    );
};

export default C4ComponentDiagram;
