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

// Colores para el diagrama C4 - Nivel de Container
const CONTAINER_COLORS = {
    aggregate: '#1168bd',
    entity: '#63b3ed',
    valueObject: '#48bb78',
    repository: '#ed8936',
    service: '#9f7aea',
};

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, ranksep: 80, nodesep: 60 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: node.width || 180, height: node.height || 80 });
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
                x: nodeWithPosition.x - (node.width || 180) / 2,
                y: nodeWithPosition.y - (node.height || 80) / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

const C4ContainerDiagram = ({ data }) => {
    const initialNodes = useMemo(() => {
        if (!data || !data.aggregates) return [];

        const nodes = [];
        const nodeIdMap = new Map(); // Mapa para rastrear IDs de agregados

        // Agregar agregados y sus componentes
        data.aggregates?.forEach((aggregate, aggIndex) => {
            const aggregateId = `aggregate-${aggIndex}`;
            nodeIdMap.set(aggregate.name, aggregateId);
            
            // Agregar nodo del agregado
            nodes.push({
                id: aggregateId,
                type: 'default',
                data: {
                    label: (
                        <div style={{ padding: '8px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
                                {aggregate.name}
                            </div>
                            <div style={{ fontSize: '10px', marginTop: '3px' }}>
                                [Agregado]
                            </div>
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                width: 180,
                height: 80,
                style: {
                    background: CONTAINER_COLORS.aggregate,
                    color: 'white',
                    border: '2px solid #0d4d8c',
                    borderRadius: '8px',
                },
            });

            // Agregar entidades del agregado
            aggregate.entities?.forEach((entity, entityIndex) => {
                nodes.push({
                    id: `entity-${aggIndex}-${entityIndex}`,
                    type: 'default',
                    data: {
                        label: (
                            <div style={{ padding: '6px', textAlign: 'center' }}>
                                <div style={{ fontWeight: '600', fontSize: '12px' }}>
                                    {entity.name}
                                </div>
                                <div style={{ fontSize: '9px', marginTop: '2px' }}>
                                    [Entidad]
                                </div>
                            </div>
                        ),
                    },
                    position: { x: 0, y: 0 },
                    width: 160,
                    height: 70,
                    style: {
                        background: CONTAINER_COLORS.entity,
                        color: 'white',
                        border: '1px solid #4299e1',
                        borderRadius: '6px',
                        fontSize: '11px',
                    },
                });
            });

            // Agregar value objects
            aggregate.valueObjects?.forEach((vo, voIndex) => {
                nodes.push({
                    id: `vo-${aggIndex}-${voIndex}`,
                    type: 'default',
                    data: {
                        label: (
                            <div style={{ padding: '6px', textAlign: 'center' }}>
                                <div style={{ fontWeight: '600', fontSize: '11px' }}>
                                    {vo.name}
                                </div>
                                <div style={{ fontSize: '9px', marginTop: '2px' }}>
                                    [Value Object]
                                </div>
                            </div>
                        ),
                    },
                    position: { x: 0, y: 0 },
                    width: 150,
                    height: 65,
                    style: {
                        background: CONTAINER_COLORS.valueObject,
                        color: 'white',
                        border: '1px solid #38a169',
                        borderRadius: '6px',
                        fontSize: '10px',
                    },
                });
            });
        });

        // Agregar repositorios
        data.repositories?.forEach((repo, repoIndex) => {
            const repoId = `repo-${repoIndex}`;
            nodeIdMap.set(repo.name, repoId);
            
            nodes.push({
                id: repoId,
                type: 'default',
                data: {
                    label: (
                        <div style={{ padding: '8px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                {repo.name}
                            </div>
                            <div style={{ fontSize: '9px', marginTop: '3px' }}>
                                [Repositorio]
                            </div>
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                width: 170,
                height: 75,
                style: {
                    background: CONTAINER_COLORS.repository,
                    color: 'white',
                    border: '2px solid #c05621',
                    borderRadius: '8px',
                },
            });
        });

        return nodes;
    }, [data]);

    const initialEdges = useMemo(() => {
        if (!data || !data.aggregates || !data.repositories) return [];

        const edges = [];
        let edgeId = 0;

        // Crear relaciones entre agregados y repositorios
        data.aggregates?.forEach((aggregate, aggIndex) => {
            data.repositories?.forEach((repo, repoIndex) => {
                // Intentar relacionar repositorio con agregado
                const repoNameLower = (repo.name || '').toLowerCase();
                const aggNameLower = (aggregate.name || '').toLowerCase();
                const aggRootLower = (repo.aggregateRoot || '').toLowerCase();
                
                if (aggRootLower === aggNameLower || 
                    repoNameLower.includes(aggNameLower) ||
                    aggNameLower.includes(repoNameLower.replace('repository', '').replace('repo', ''))) {
                    edges.push({
                        id: `edge-${edgeId}`,
                        source: `aggregate-${aggIndex}`,
                        target: `repo-${repoIndex}`,
                        label: 'persiste',
                        type: 'smoothstep',
                        animated: false,
                        style: { stroke: '#ed8936', strokeWidth: 2 },
                        labelStyle: { fill: '#ed8936', fontWeight: 600, fontSize: 10 },
                        labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                            color: '#ed8936',
                        },
                    });
                    edgeId++;
                }
            });
        });

        return edges;
    }, [data]);

    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
        () => getLayoutedElements(initialNodes, initialEdges),
        [initialNodes, initialEdges]
    );

    const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
    const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

    if (!data || (!data.aggregates && !data.repositories)) {
        return (
            <div className="p-4 text-center text-gray-500">
                No hay datos de contenedores disponibles para mostrar el diagrama C4.
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '700px', border: '1px solid #ddd', borderRadius: '8px' }}>
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
                        if (node.id.startsWith('aggregate-')) return CONTAINER_COLORS.aggregate;
                        if (node.id.startsWith('entity-')) return CONTAINER_COLORS.entity;
                        if (node.id.startsWith('vo-')) return CONTAINER_COLORS.valueObject;
                        if (node.id.startsWith('repo-')) return CONTAINER_COLORS.repository;
                        return CONTAINER_COLORS.service;
                    }}
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
            </ReactFlow>
        </div>
    );
};

export default C4ContainerDiagram;
