
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface LearningNodeData {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  status: 'completed' | 'in-progress' | 'planned';
  category: string;
}

interface LearningNodeProps {
  data: LearningNodeData;
  selected?: boolean;
}

const LearningNode = memo(({ data, selected }: LearningNodeProps) => {
  const IconComponent = data.icon;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 border-success text-foreground';
      case 'in-progress': return 'bg-primary/10 border-primary text-foreground';
      default: return 'bg-muted border-muted-foreground/40 text-foreground';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-primary';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="learning-node">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!bg-primary !border-primary !w-3 !h-3" 
      />
      
      <Card className={`
        w-64 hover:shadow-lg transition-all duration-300 border-2
        ${getStatusColor(data.status)}
        ${selected ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-lg bg-background/80">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {data.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {data.subtitle}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {data.category}
                </Badge>
                <div className={`w-2 h-2 rounded-full ${getStatusBadgeColor(data.status)}`} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!bg-primary !border-primary !w-3 !h-3" 
      />
    </div>
  );
});

LearningNode.displayName = 'LearningNode';

export default LearningNode;
