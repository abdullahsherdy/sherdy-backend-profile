
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionMode,
  MarkerType,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Brain, Cloud, Network, Zap, Database, Settings } from "lucide-react";
import LearningNode from './LearningNode';
import { Card, CardContent } from '@/components/ui/card';

const nodeTypes = {
  learning: LearningNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'learning',
    position: { x: 0, y: 0 },
    data: {
      title: 'System Design',
      subtitle: 'Scalable architecture principles',
      icon: Settings,
      status: 'completed',
      category: 'Foundation'
    }
  },
  {
    id: '2',
    type: 'learning',
    position: { x: 300, y: 0 },
    data: {
      title: 'Microservices Architecture',
      subtitle: 'Advanced distributed system patterns',
      icon: Network,
      status: 'in-progress',
      category: 'Advanced'
    }
  },
  {
    id: '3',
    type: 'learning',
    position: { x: 600, y: 0 },
    data: {
      title: 'Kubernetes & Docker',
      subtitle: 'Container orchestration & deployment',
      icon: Cloud,
      status: 'in-progress',
      category: 'DevOps'
    }
  },
  {
    id: '4',
    type: 'learning',
    position: { x: 150, y: 200 },
    data: {
      title: 'Event-Driven Architecture',
      subtitle: 'Asynchronous messaging patterns',
      icon: Database,
      status: 'planned',
      category: 'Advanced'
    }
  },
  {
    id: '5',
    type: 'learning',
    position: { x: 450, y: 200 },
    data: {
      title: 'gRPC & High-Performance APIs',
      subtitle: 'Modern communication protocols',
      icon: Zap,
      status: 'planned',
      category: 'Performance'
    }
  },
  {
    id: '6',
    type: 'learning',
    position: { x: 300, y: 400 },
    data: {
      title: 'AI/ML Integration',
      subtitle: 'Backend services for ML models',
      icon: Brain,
      status: 'planned',
      category: 'AI/ML'
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: 'hsl(var(--primary))' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: 'hsl(var(--primary))' }
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  }
];

const LearningRoadmap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <section ref={sectionRef} id="learning" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">🧠 Learning Roadmap</h2>
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 text-center">
            <p className="text-muted-foreground mb-4">
              Navigate through my learning journey. Click and drag to explore!
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span>Planned</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div 
              className="w-full bg-card border rounded-lg overflow-hidden" 
              style={{ height: '600px' }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                connectionMode={ConnectionMode.Loose}
                fitView
                fitViewOptions={{
                  padding: 0.1,
                }}
                defaultEdgeOptions={{
                  style: { strokeWidth: 2 },
                }}
                proOptions={{ hideAttribution: true }}
              >
                <Controls position="top-right" />
                <MiniMap 
                  position="bottom-right"
                  pannable
                  zoomable
                  className="!bg-background !border !border-border"
                />
                <Background 
                  variant={BackgroundVariant.Dots} 
                  gap={20} 
                  size={1} 
                  color="hsl(var(--border))"
                />
              </ReactFlow>
            </div>

            {selectedNode && (
              <Card className="absolute top-4 left-4 w-80 z-10 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {selectedNode.data.icon && (
                        <selectedNode.data.icon className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedNode.data.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedNode.data.category}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{selectedNode.data.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium capitalize">
                      Status: {selectedNode.data.status.replace('-', ' ')}
                    </span>
                    <button 
                      onClick={() => setSelectedNode(null)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Close
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningRoadmap;
